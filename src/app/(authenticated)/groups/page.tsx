import { GroupList } from "@/components/GroupList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GroupsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button asChild>
          <Link href="/groups/create">Create Group</Link>
        </Button>
      </div>
      <GroupList />
    </div>
  )
}

