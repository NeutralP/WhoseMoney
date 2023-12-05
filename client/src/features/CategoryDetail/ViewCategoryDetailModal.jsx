import { DatePicker, Input, Modal, Select, Button } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import EditCategoryLimitModal from '../CategoryLimit/EditCategoryLimitModal';

// Use for both add and edit
const ViewCategoryDetailModal = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
    console.log('Cancel');
  };

  const handleOk = () => {
    setOpen(false);
    console.log('Ok');
  };

  const [editCategoryLimit, setEditCategoryLimit] = useState(false)


  return (
    <div>
    <Modal
      title={'Danh mục 1'}
      open={open}
      onCancel={handleCancel}
      width={400}
      centered
      footer={null}
      className="custom-modal"
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Amount */}
          <div className="text-base font-medium truncate">Hạn mức</div>
          <div className="text-base truncate">
            {/* {hạn mức} */}
            5.000.000VND
          </div>
          <div className="text-base font-medium truncate">Số tiền đã chi</div>
          <div className="text-base truncate">
            {/* {số tiền đã chi} */}
            1.000.000VNĐ
          </div>
          <div className="text-base font-medium truncate">Số tiền còn dư</div>
          <div className="text-base truncate">
            {/* {số tiền còn dư} */}
            2.000.000VNĐ
          </div>
          <div className="text-base font-medium truncate">Quá trình</div>
          <div className="text-base truncate mb-4">
            {/* {quá trình là gì?} */}
            30%
          </div>
        </div>
        <footer className="flex items-center justify-center gap-4">
          <Button
            type="default"
            size="large"
            onClick={() => setEditCategoryLimit(true)}
          >
            Chỉnh sửa
          </Button>
        </footer>
      </div>
    </Modal>
    <EditCategoryLimitModal 
    open={editCategoryLimit}
    setOpen={setEditCategoryLimit}
    />
    </div>
  );
};

export default ViewCategoryDetailModal;
