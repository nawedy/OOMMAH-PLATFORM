import * as tf from '@tensorflow/tfjs';
import { prisma } from '../lib/prisma';

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface User {
  id: string;
  likedPosts: Post[];
}

const createPostVector = (post: Post): number[] => {
  // Simple bag-of-words representation
  const words = new Set([...post.title.split(' '), ...post.content.split(' '), ...post.tags]);
  return Array.from(words).map(word => (post.title + post.content).split(word).length - 1);
};

const createUserVector = (user: User): number[] => {
  const userVector = user.likedPosts.reduce((acc, post) => {
    const postVector = createPostVector(post);
    return acc.map((val, i) => val + postVector[i]);
  }, new Array(createPostVector(user.likedPosts[0])).fill(0));

  return userVector.map(val => val / user.likedPosts.length);
};

export const getMLRecommendations = async (userId: string): Promise<Post[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      likedPosts: {
        include: { tags: true },
      },
    },
  });

  if (!user || user.likedPosts.length === 0) {
    throw new Error('User not found or has no liked posts');
  }

  const allPosts = await prisma.post.findMany({
    include: { tags: true },
    where: {
      NOT: {
        id: { in: user.likedPosts.map(post => post.id) },
      },
    },
  });

  const userVector = createUserVector(user);
  const postVectors = allPosts.map(createPostVector);

  const userTensor = tf.tensor2d([userVector]);
  const postTensor = tf.tensor2d(postVectors);

  const similarities = tf.matMul(userTensor, postTensor.transpose());
  const topIndices = await similarities.flatten().topk(10).indices.array();

  return topIndices.map(index => allPosts[index]);
};

