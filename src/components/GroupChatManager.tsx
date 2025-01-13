import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from '@/components/ui/button';
import { createGroup, addUserToGroup, removeUserFromGroup } from '../store/groupChatSlice';

const GroupChatManager: React.FC<{ groupId: string }> = ({ groupId }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [newMember, setNewMember] = useState('');

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      dispatch(createGroup(groupName));
      setGroupName('');
    }
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      dispatch(addUserToGroup({ groupId, userId: newMember }));
      setNewMember('');
    }
  };

  const handleRemoveMember = (userId: string) => {
    dispatch(removeUserFromGroup({ groupId, userId }));
  };

  return (
    <div className="p-4">
      <Input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
      <Button onClick={handleCreateGroup}>Create Group</Button>

      <Input
        value={newMember}
        onChange={(e) => setNewMember(e.target.value)}
        placeholder="Enter user ID to add"
      />
      <Button onClick={handleAddMember}>Add Member</Button>

      {/* Render group members here with remove buttons */}
    </div>
  );
};

export default GroupChatManager;

