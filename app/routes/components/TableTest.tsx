import { Link } from "@remix-run/react";
import { Avatar, Badge, Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "flowbite-react";

export default function TableTest() {
    return (
      <div className="bg-white p-8">

          <div className="mb-6">
            <h2 className="text-3xl font-bold">Event budgets</h2>
            <p className="text-gray-600">Overview of your event budgets</p>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHead>Budget</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead>End date</TableHead>
                <TableHead />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>DesignCon 2023</TableCell>
                <TableCell>$12,000</TableCell>
                <TableCell>
                  <Badge >Planned</Badge>
                </TableCell>
                <TableCell>Jan 20, 2023</TableCell>
                <TableCell>Mar 20, 2023</TableCell>
                <TableCell>
                  <Button >Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>User Summit 2023</TableCell>
                <TableCell>$25,000</TableCell>
                <TableCell>
                  <Badge >Planned</Badge>
                </TableCell>
                <TableCell>Feb 15, 2023</TableCell>
                <TableCell>Apr 15, 2023</TableCell>
                <TableCell>
                  <Button >Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Developer Week 2023</TableCell>
                <TableCell>$18,000</TableCell>
                <TableCell>
                  <Badge >Planned</Badge>
                </TableCell>
                <TableCell>Mar 5, 2023</TableCell>
                <TableCell>May 5, 2023</TableCell>
                <TableCell>
                  <Button >Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Marketing Expo 2023</TableCell>
                <TableCell>$30,000</TableCell>
                <TableCell>
                  <Badge >Planned</Badge>
                </TableCell>
                <TableCell>Apr 1, 2023</TableCell>
                <TableCell>Jun 1, 2023</TableCell>
                <TableCell>
                  <Button >Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
      </div>
    )
  }