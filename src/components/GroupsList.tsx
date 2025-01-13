import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroups, joinGroup } from '../store/groupsSlice';
import { RootState } from '../store';
import { Button } from '@/components/ui/button';

export default function GroupsList() {
  const dispatch = useDispatch();
  const groups = useSelector((state: RootState) => state.groups.items);

  React.useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const renderGroup = (item: any) => (
    <div key={item.id} className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.membersCount} members</p>
      <Button onClick={() => dispatch(joinGroup(item.id))}>Join</Button>
    </div>
  );

  return (
    <div className="space-y-4">
      {groups.map(renderGroup)}
    </div>
  );
}

