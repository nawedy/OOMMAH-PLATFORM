import { ProductList } from "@/components/ProductList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button asChild>
          <Link href="/marketplace/create">List Item</Link>
        </Button>
      </div>
      <ProductList />
    </div>
  )
}

