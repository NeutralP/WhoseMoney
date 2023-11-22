import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useMediaQuery } from 'usehooks-ts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '~/utils';
import axiosClient from '~/axios';
import { userStateContext } from '~/contexts/ContextProvider';
import { MdDashboard } from 'react-icons/md';

const Sidebar = ({}) => {
  const { setCurrentUser, setUserToken } = userStateContext();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const isResizingRef = useRef(false);
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    // Mouse move use to resize
    document.addEventListener('mousemove', handleMouseMove);
    // Stop resizing
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) {
      newWidth = 240;
    }

    if (newWidth > 480) {
      newWidth = 480;
    }

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : `240px`;
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : `240px`);
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : `calc(100% - 240px)`
      );

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('left', '0');
      navbarRef.current.style.setProperty('width', '100%');

      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleLogOut = () => {
    axiosClient.post('/auth/signout').then(() => {
      setCurrentUser({});
      setUserToken(null);
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar w-60',
          'sidebar',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className="sidebar-item">
          <div role="button" onClick={handleLogOut}>
            Logout
          </div>
          <div
            role="button"
            className={cn(
              'w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
              isMobile && 'opacity-100'
            )}
            onClick={collapse}
          >
            <AiOutlineMenuUnfold className="w-6 h-6" />
          </div>
        </div>

        <Link
          to="/dashboard"
          className={cn(
            'sidebar-item',
            pathname === '/dashboard' && 'sidebar-item--active'
          )}
        >
          <div className="flex items-center gap-3">
            <MdDashboard className="icon" />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link
          to="/"
          className={cn(
            'sidebar-item',
            pathname === '/' && 'sidebar-item--active'
          )}
        >
          <div className="flex items-center gap-3">
            <MdDashboard className="icon" />
            <p>Quản lí danh mục</p>
          </div>
        </Link>

        <Link
          to="/"
          className={cn(
            'sidebar-item',
            pathname === '/' && 'sidebar-item--active'
          )}
        >
          <div className="flex items-center gap-3">
            <MdDashboard className="icon" />
            <p>Quản lí chi</p>
          </div>
        </Link>

        <Link
          to="/receipts-management"
          className={cn(
            'sidebar-item',
            pathname === '/receipts-management' && 'sidebar-item--active'
          )}
        >
          <div className="flex items-center gap-3">
            <MdDashboard className="icon" />
            <p>Quản lí thu</p>
          </div>
        </Link>

        <Link
          to="/"
          className={cn(
            'sidebar-item',
            pathname === '/' && 'sidebar-item--active'
          )}
        >
          <div className="flex items-center gap-3">
            <MdDashboard className="icon" />
            <p>Quản lí tiết kiệm</p>
          </div>
        </Link>

        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className={cn(
            'resize-bar',
            'opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0'
          )}
        ></div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-full left-0'
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <AiOutlineMenuUnfold
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
