import React from 'react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export default function Settings() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="bg-white/50 backdrop-blur shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage app preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Language</span>
                <select className="rounded-md border border-gray-300 p-2">
                  <option>English</option>
                  <option>Finnish</option>
                  <option>German</option>
                </select>
              </li>
              <li className="flex justify-between items-center">
                <span>Time Zone</span>
                <select className="rounded-md border border-gray-300 p-2">
                  <option>UTC</option>
                  <option>GMT+1</option>
                  <option>GMT+2</option>
                </select>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-white/50 backdrop-blur shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Control user access</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Admins</span>
                <button className="text-blue-600 hover:underline">View</button>
              </li>
              <li className="flex justify-between items-center">
                <span>Staff</span>
                <button className="text-blue-600 hover:underline">Manage</button>
              </li>
              <li className="flex justify-between items-center">
                <span>Add User</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-md">
                  Add
                </button>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-white/50 backdrop-blur shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Set notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Email Alerts</span>
                <input type="checkbox" className="rounded text-blue-600" />
              </li>
              <li className="flex justify-between items-center">
                <span>SMS Notifications</span>
                <input type="checkbox" className="rounded text-blue-600" />
              </li>
              <li className="flex justify-between items-center">
                <span>Push Notifications</span>
                <input type="checkbox" className="rounded text-blue-600" />
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card className="bg-white/50 backdrop-blur shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Manage subscription and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Subscription Plan</span>
                <span>Premium</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Payment Method</span>
                <button className="text-blue-600 hover:underline">Update</button>
              </li>
              <li className="flex justify-between items-center">
                <span>Invoices</span>
                <button className="text-blue-600 hover:underline">View</button>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="bg-white/50 backdrop-blur shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Customize app appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Dark Mode</span>
                <input type="checkbox" className="rounded text-blue-600" />
              </li>
              <li className="flex justify-between items-center">
                <span>Accent Color</span>
                <select className="rounded-md border border-gray-300 p-2">
                  <option>Blue</option>
                  <option>Green</option>
                  <option>Red</option>
                </select>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
