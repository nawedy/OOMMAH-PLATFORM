import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import ABTestDashboard from '../../components/ABTestDashboard';

const ABTestResultsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">A/B Test Results</h1>
      <ABTestDashboard />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ABTestResultsPage;

