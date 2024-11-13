import React from 'react'
import AddTransactionCard from './AddTransactionCard'
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pagination } from '@/components/ui/pagination';



const TransactionForm = () => {
  return (
    <div>
      <div className='flex flex-row mb-11'>
        <Input type='text' placeholder='Search Transaction By category' className='w-1/2'/>
      <AddTransactionCard/>
      </div>
      <Table>
  <TableCaption>A list of your recent transactions.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Transaction</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Description</TableHead>
      <TableHead className="text-right">Type</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Date</TableHead>
      <TableHead><button>Edit</button></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
<div className="flex justify-center mt-4">
        <Pagination
          
        />
      </div>

      
    </div>
  )
}

export default TransactionForm
