import { Avatar, Badge } from 'antd';
import React from 'react';
import { FaBell } from 'react-icons/fa';
import { cn } from '~/utils';
import { UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <div className={cn('navbar')}>
      <div className="flex items-center">
        <Badge count={5}>
          <FaBell className="noti-icon" />
        </Badge>
        <div className="flex items-center gap-3 cursor-pointer ml-4">
          <p>Username</p>
          <Avatar size={36} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
