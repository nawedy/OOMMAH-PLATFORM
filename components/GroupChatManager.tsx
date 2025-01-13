import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createGroup, addUserToGroup, removeUserFromGroup } from '@/store/groupChatSlice';

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
    <div className="p-4 space-y-4">
      <div>
        <Input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Enter group name"
          className="mb-2"
        />
        <Button onClick={handleCreateGroup}>Create Group</Button>
      </div>

      <div>
        <Input
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Enter user ID to add"
          className="mb-2"
        />
        <Button onClick={handleAddMember}>Add Member</Button>
      </div>
    </div>
  );
};

export default GroupChatManager;

