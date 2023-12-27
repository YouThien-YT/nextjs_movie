// sử dụng thư viện SWR để lấy thông tin người dùng hiện tại từ một API endpoint.

import useSwr from 'swr'

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    // Sử dụng hook SWR với đường dẫn /api/current và hàm fetcher. SWR là một thư viện phổ biến trong React để quản lý việc lấy dữ liệu từ server. Kết quả trả về từ hook SWR gán vào các biến data, error, isLoading, và mutate.
  const { data, error, isLoading, mutate } = useSwr('/api/current', fetcher);
 
//  Trả về một đối tượng chứa các biến data, error, isLoading, và mutate. Các biến này sẽ được sử dụng bên ngoài hook useCurrentUser để truy cập kết quả của yêu cầu, thông báo lỗi, trạng thái tải, và cập nhật dữ liệu.
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useCurrentUser;