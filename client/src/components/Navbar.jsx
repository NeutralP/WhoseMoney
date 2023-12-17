import { Avatar, Badge } from 'antd';
import React from 'react';
import { FaBell } from 'react-icons/fa';
import { cn } from '~/utils';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className={cn('navbar')}>
      <h1 className="text-lg font-bold">Whose Money $$$</h1>
      <div className="flex items-center">
        {/* <Badge count={5}> */}
        <FaBell
          onClick={() => navigate('/notifications')}
          className="noti-icon"
        />
        {/* </Badge> */}
        <div className="flex items-center gap-3 cursor-pointer ml-4">
          <p>Username</p>
          <Avatar size={36} icon={<UserOutlined />} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
