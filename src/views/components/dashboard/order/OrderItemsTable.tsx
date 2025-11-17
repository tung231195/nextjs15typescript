"use client";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { CartItem } from "@/app/types";

export default function OrderItemsTable({ items }: { items: CartItem[] }) {
  return (
    <>
      <Typography variant="h6" mb={1}>
        Ordered Items
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.product}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
