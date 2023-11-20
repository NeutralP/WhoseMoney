import React, {useState, useEffect, useRef} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReceiptManagementModal.scss'
import { formatDate } from '~/utils/time';


const ReceiptManagementModal = ({ isOpen, onClose, onSave}) => {
    const modalRef = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const [receiptData, setReceiptData] = useState({
        receipt_name: '',
        receipt_source: '',
        receipt_amount: '',
        time: '',
      });
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, onClose]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReceiptData({ ...receiptData, [name]: value });
      };

    const handlePayingMoneyChange = (e) => {
        const { name, value } = e.target;
        setReceiptData({ ...receiptData, [name]: Number(value) });
    };


    const handleSubmit = (e) => {
        e.preventDefault(); 
        receiptData.time = formatDate(startDate)
        onSave(receiptData);
        console.log(receiptData);
    };

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div ref={modalRef} className="bg-white p-5 rounded-lg w-96 shadow-lg">
      <form className="bg-white" onSubmit={handleSubmit}>
        <button  type="button" onClick={onClose} className="float-right font-bold">X</button>
        <div className="clear-both text-lg font-bold mb-4">Thêm khoản thu</div>
        
        <div className="mb-2">
          <label className="block mb-1 font-bold">Số dư trước:</label>
          <div className="bg-gray-200 p-2 rounded">20.000.000</div>
        </div>

        <div className="mb-2">
          <label className="block mb-1 font-bold">Số dư sau:</label>
          <div className="bg-gray-200 p-2 rounded">20.000.000</div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Tên khoản thu</label>
          <input 
            onChange={handleInputChange} 
            type="text" 
            name="receipt_name"
            value={receiptData.receipt_name}
            placeholder="Tên khoản thu"
            className="border border-solid focus:border focus:border-solid border-gray-300 rounded w-full p-2" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Danh mục</label>
          <select className=" bg-white border border-gray-300 rounded w-full p-2">
            <option value="">Chọn danh mục</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Số Tiền</label>
          <input
            onChange={handlePayingMoneyChange} 
            type="text" 
            name="receipt_amount"
            placeholder="Số Tiền" 
            value={receiptData.receipt_amount}
            className="border border-solid focus:border focus:border-solid border-gray-300 rounded w-full p-2"/>
        </div>

        <div className="mb-4">
            <label htmlFor="date-picker" className="block mb-2 font-semibold mr-4 w-full">Chọn ngày:</label>
            <div className="mt-2 w-full">
                <DatePicker
                    id="date-picker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                    className="border border-solid focus:border focus:border-solid border-gray-300 rounded w-full p-2"
                />
            </div>
        </div>

        <button  id="submit" type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 w-full rounded">Save</button>
      </form>
      </div>

    </div>
  );
};

export default ReceiptManagementModal;
