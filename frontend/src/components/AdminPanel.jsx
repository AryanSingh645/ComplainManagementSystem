import { useState, useMemo, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ComplaintCard from './ComplaintCard';
import ComplaintModal from './ComplaintModal';
import ReportModal from './ReportModal';
import ProfileDropdown from './ProfileDropdown';
import { useAdminDashboard } from '../hooks/AdminDashboard';
import { useThemeToggle } from '../hooks/ThemeToggle';

const sampleComplaints = [
  {
    id: 1,
    name: "John Doe",
    phoneNumber: "1234567890",
    emailId: "john@example.com",
    blockNumber: "A",
    flatNumber: "101",
    complaintCategory: "Swimming Pool",
    complaintDescription: "Water quality needs improvement. The pool water appears cloudy and the chlorine levels seem too high.",
    status: "PENDING",
    timestamp: new Date(2024, 1, 15, 14, 30),
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "9876543210",
    emailId: "jane@example.com",
    blockNumber: "B",
    flatNumber: "202",
    complaintCategory: "Electrical",
    complaintDescription: "Frequent power fluctuations in the apartment causing appliances to malfunction.",
    status: "SOLVED",
    timestamp: new Date(2024, 1, 14, 10, 15),
  },
  {
    id: 3,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 4,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 5,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 6,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 7,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 9,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 10,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 11,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
  {
    id: 12,
    name: "Mike Johnson",
    phoneNumber: "5555555555",
    emailId: "mike@example.com",
    blockNumber: "C",
    flatNumber: "303",
    complaintCategory: "Parking",
    complaintDescription: "Unauthorized vehicles constantly parking in my designated spot.",
    status: "REJECTED",
    timestamp: new Date(2024, 1, 13, 16, 45),
  },
];

const complaintCategories = [
  'All Categories',
  'Swimming Pool',
  'Water Supply',
  'Parking',
  'Plumbing',
  'Electrical',
  'Lift',
  'House Keeping',
  'Garbage Collector',
  'Security',
  'Clubhouse',
  'Park',
  'Generator'
];

const timeFilters = [
  { label: 'All Time', value: 'all' },
  { label: 'Last 24 Hours', value: '24h' },
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
];

const statusFilters = [
  { label: 'All Status', value: 'all' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Solved', value: 'SOLVED' },
  { label: 'Rejected', value: 'REJECTED' },
];

const AdminPanel = () => {
  // const [complaints, setComplaints] = useState(sampleComplaints);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [complaintForReport, setComplaintForReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTime, setSelectedTime] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const {complaints, setComplaints} = useAdminDashboard();
  const {darkMode, setDarkMode} = useThemeToggle();

  console.log("Complaints in Admin Panel:", complaints);

  const handleStatusChange = (complaintId, newStatus) => {
    console.log(complaintId, "complaintId in handleStatusChange");
    setComplaints(complaints.map(complaint =>
      complaint.id === complaintId ? { ...complaint, status: newStatus } : complaint
    ));
  };

  const handleReport = (complaintId, reportType, message) => {
    console.log('Report Data:', {
      complaintId,
      reportType,
      message,
      timestamp: new Date(),
    });
    setReportModalOpen(false);
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint, index, self) => {
      const matchesSearch = complaint.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || complaint.complaintCategory === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
      
      let matchesTime = true;
      const now = new Date();
      const complaintDate = new Date(complaint.timestamp);
      
      switch (selectedTime) {
        case '24h':
          matchesTime = now - complaintDate <= 24 * 60 * 60 * 1000;
          break;
        case '7d':
          matchesTime = now - complaintDate <= 7 * 24 * 60 * 60 * 1000;
          break;
        case '30d':
          matchesTime = now - complaintDate <= 30 * 24 * 60 * 60 * 1000;
          break;
      }

      // Ensure no duplicate complaints are added
      // const isUnique = self.findIndex(c => c.id === complaint.id) === index;

      return matchesSearch && matchesCategory && matchesStatus && matchesTime;
    });
  }, [complaints, searchQuery, selectedCategory, selectedStatus, selectedTime]);
  useEffect(() => {
    console.log("Filtered Complaints:", filteredComplaints);
  }, [filteredComplaints])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complaint Management</h1>
        <ProfileDropdown darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {complaintCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timeFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statusFilters.map(filter => (
              <option key={filter.value} value={filter.value}>{filter.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredComplaints.map((complaint, index) => (
          <ComplaintCard
            key={index}
            complaint={complaint}
            onStatusChange={handleStatusChange}
            onViewDetails={() => setSelectedComplaint(complaint)}
            onReport={() => {
              setComplaintForReport(complaint);
              setReportModalOpen(true);
            }}
          />
        ))}
      </div>

      <ComplaintModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={handleReport}
        complaintId={complaintForReport?.id}
      />
    </div>
  );
};

export default AdminPanel;