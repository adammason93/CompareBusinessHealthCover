import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "/utils/supabase/info";
import { Pencil, Save, X, Search, Download, LogOut, Filter } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  submissionId: string;
  companyName: string;
  leadDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverType: string;
  // Editable fields
  isInsured: string;
  source: string; // organic or ppc
  premiumValue: string;
  commissionPaid: string;
  policyStartDate: string;
  insurer: string;
  comments: string;
}

export function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCell, setEditingCell] = useState<{ leadId: string; field: keyof Lead } | null>(null);
  const [editedValues, setEditedValues] = useState<{ [key: string]: any }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterInsured, setFilterInsured] = useState<string>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Password protection - check on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'authenticated_hcc_2024') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    const ADMIN_PASSWORD = "HealthCover2024!";
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'authenticated_hcc_2024');
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Filter leads based on search and filters
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSource !== "all") {
      filtered = filtered.filter(lead => lead.source === filterSource);
    }

    if (filterInsured !== "all") {
      filtered = filtered.filter(lead => lead.isInsured === filterInsured);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, filterSource, filterInsured]);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 Fetching leads from API...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/admin/leads`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      console.log('📡 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to fetch leads:', errorText);
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      console.log('✅ Received data:', data);
      console.log('📊 Number of leads:', data.leads?.length || 0);
      
      setLeads(data.leads || []);
      setFilteredLeads(data.leads || []);
    } catch (error) {
      console.error("❌ Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (lead: Lead, field: keyof Lead) => {
    setEditingCell({ leadId: lead.id, field });
    setEditedValues({ ...editedValues, [lead.id]: { ...lead } });
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditedValues({});
  };

  const saveEdit = async () => {
    if (!editingCell) return;

    const { leadId, field } = editingCell;
    const lead = editedValues[leadId] as Lead;

    try {
      console.log('💾 Saving lead:', leadId);
      console.log('📝 Edited data:', JSON.stringify(lead));
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/admin/leads/${leadId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            companyName: lead.companyName,
            leadDate: lead.leadDate,
            firstName: lead.firstName,
            lastName: lead.lastName,
            email: lead.email,
            phone: lead.phone,
            coverType: lead.coverType,
            isInsured: lead.isInsured,
            source: lead.source,
            premiumValue: lead.premiumValue,
            commissionPaid: lead.commissionPaid,
            policyStartDate: lead.policyStartDate,
            insurer: lead.insurer,
            comments: lead.comments,
          }),
        }
      );

      console.log('📡 Save response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to save:', errorText);
        throw new Error("Failed to update lead");
      }

      const result = await response.json();
      console.log('✅ Save successful:', result);

      // Update local state
      setLeads(leads.map(l => l.id === leadId ? lead : l));
      setEditingCell(null);
      setEditedValues({});
      
      alert('✅ Lead saved successfully!');
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Company Name",
      "Lead Date",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Cover Type",
      "Is Insured",
      "Source",
      "Premium Value",
      "Commission Paid",
      "Policy Start Date",
      "Insurer",
      "Comments"
    ];

    const rows = filteredLeads.map(lead => [
      lead.companyName || "",
      lead.leadDate || "",
      lead.firstName || "",
      lead.lastName || "",
      lead.email || "",
      lead.phone || "",
      lead.coverType || "",
      lead.isInsured || "",
      lead.source || "",
      lead.premiumValue || "",
      lead.commissionPaid || "",
      lead.policyStartDate || "",
      lead.insurer || "",
      lead.comments || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const updateEditedField = (field: keyof Lead, value: string) => {
    if (editingCell) {
      const { leadId } = editingCell;
      setEditedValues({
        ...editedValues,
        [leadId]: {
          ...editedValues[leadId],
          [field]: value,
        },
      });
    }
  };

  // If not authenticated, show password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#2d2f5e] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-600 mt-2">Enter password to access lead management</p>
          </div>
          
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-[#2d2f5e] text-white py-2 px-4 rounded-lg hover:bg-[#1f2454] transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If loading, show spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1f2454' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading leads...</p>
        </div>
      </div>
    );
  }

  // Main content - authenticated and loaded
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1f2454' }}>
      {/* Main Admin Dashboard */}
      <div className="p-3 sm:p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2d2f5e] mb-1">Lead Management</h1>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} found
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, company, or email..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base min-w-[150px]"
              >
                <option value="all">All Sources</option>
                <option value="Organic">Organic</option>
                <option value="PPC">PPC</option>
              </select>

              <select
                value={filterInsured}
                onChange={(e) => setFilterInsured(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="yes">Insured</option>
                <option value="no">Not Insured</option>
                <option value="pending">Pending</option>
              </select>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterSource("all");
                  setFilterInsured("all");
                }}
                className="px-4 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Filter className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center p-8 sm:p-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d2f5e] mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading leads...</p>
              </div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center p-8 sm:p-12">
              <p className="text-gray-500 text-base sm:text-lg">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-[#2d2f5e] text-white">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Company</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Date</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Contact Info</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Cover Type</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Status</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Source</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Premium</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Commission</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Policy Start</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Insurer</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Comments</th>
                    <th className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads?.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      {/* Company Name - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "companyName")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "companyName" ? (
                          <input
                            type="text"
                            value={editedValues[lead.id]?.companyName || ""}
                            onChange={(e) => updateEditedField("companyName", e.target.value)}
                            onBlur={saveEdit}
                            placeholder="Company name"
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          lead.companyName || "-"
                        )}
                      </td>

                      {/* Lead Date - Editable */}
                      <td 
                        className="px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "leadDate")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "leadDate" ? (
                          <input
                            type="date"
                            value={editedValues[lead.id]?.leadDate ? editedValues[lead.id].leadDate.split('T')[0] : ""}
                            onChange={(e) => updateEditedField("leadDate", e.target.value)}
                            onBlur={saveEdit}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          lead.leadDate ? format(new Date(lead.leadDate), "dd/MM/yyyy") : "-"
                        )}
                      </td>

                      {/* Contact - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "firstName")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "firstName" ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={editedValues[lead.id]?.firstName || ""}
                              onChange={(e) => updateEditedField("firstName", e.target.value)}
                              placeholder="First name"
                              className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                              autoFocus
                            />
                            <input
                              type="text"
                              value={editedValues[lead.id]?.lastName || ""}
                              onChange={(e) => updateEditedField("lastName", e.target.value)}
                              placeholder="Last name"
                              className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            />
                            <input
                              type="email"
                              value={editedValues[lead.id]?.email || ""}
                              onChange={(e) => updateEditedField("email", e.target.value)}
                              placeholder="Email"
                              className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            />
                            <input
                              type="tel"
                              value={editedValues[lead.id]?.phone || ""}
                              onChange={(e) => updateEditedField("phone", e.target.value)}
                              placeholder="Phone"
                              className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">{lead.firstName} {lead.lastName}</p>
                            <p className="text-gray-500 text-xs">{lead.email}</p>
                            <p className="text-gray-500 text-xs">{lead.phone}</p>
                          </div>
                        )}
                      </td>

                      {/* Cover Type - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "coverType")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "coverType" ? (
                          <select
                            value={editedValues[lead.id]?.coverType || ""}
                            onChange={(e) => updateEditedField("coverType", e.target.value)}
                            onBlur={saveEdit}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          >
                            <option value="">Select...</option>
                            <option value="Family">Family</option>
                            <option value="Individual">Individual</option>
                            <option value="SME">SME</option>
                            <option value="Large Corporate">Large Corporate</option>
                          </select>
                        ) : (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {lead.coverType || "-"}
                          </span>
                        )}
                      </td>

                      {/* Is Insured - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "isInsured")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "isInsured" ? (
                          <select
                            value={editedValues[lead.id]?.isInsured || ""}
                            onChange={(e) => updateEditedField("isInsured", e.target.value)}
                            onBlur={saveEdit}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          >
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="pending">Pending</option>
                          </select>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            lead.isInsured === "yes" ? "bg-green-100 text-green-800" :
                            lead.isInsured === "no" ? "bg-red-100 text-red-800" :
                            lead.isInsured === "pending" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {lead.isInsured || "-"}
                          </span>
                        )}
                      </td>

                      {/* Source - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "source")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "source" ? (
                          <select
                            value={editedValues[lead.id]?.source || ""}
                            onChange={(e) => updateEditedField("source", e.target.value)}
                            onBlur={saveEdit}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          >
                            <option value="">Select...</option>
                            <option value="Organic">Organic</option>
                            <option value="PPC">PPC</option>
                          </select>
                        ) : (
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            lead.source === "Organic" ? "bg-green-100 text-green-800" :
                            lead.source === "PPC" ? "bg-purple-100 text-purple-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {lead.source || "-"}
                          </span>
                        )}
                      </td>

                      {/* Premium Value - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "premiumValue")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "premiumValue" ? (
                          <input
                            type="text"
                            value={editedValues[lead.id]?.premiumValue || ""}
                            onChange={(e) => updateEditedField("premiumValue", e.target.value)}
                            onBlur={saveEdit}
                            placeholder="£0.00"
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{lead.premiumValue || "-"}</span>
                        )}
                      </td>

                      {/* Commission Paid - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "commissionPaid")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "commissionPaid" ? (
                          <input
                            type="text"
                            value={editedValues[lead.id]?.commissionPaid || ""}
                            onChange={(e) => updateEditedField("commissionPaid", e.target.value)}
                            onBlur={saveEdit}
                            placeholder="£0.00"
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium">{lead.commissionPaid || "-"}</span>
                        )}
                      </td>

                      {/* Policy Start Date - Editable */}
                      <td 
                        className="px-4 py-3 text-sm whitespace-nowrap cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "policyStartDate")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "policyStartDate" ? (
                          <input
                            type="date"
                            value={editedValues[lead.id]?.policyStartDate || ""}
                            onChange={(e) => updateEditedField("policyStartDate", e.target.value)}
                            onBlur={saveEdit}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          lead.policyStartDate ? format(new Date(lead.policyStartDate), "dd/MM/yyyy") : "-"
                        )}
                      </td>

                      {/* Insurer - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "insurer")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "insurer" ? (
                          <input
                            type="text"
                            value={editedValues[lead.id]?.insurer || ""}
                            onChange={(e) => updateEditedField("insurer", e.target.value)}
                            onBlur={saveEdit}
                            placeholder="Insurer name"
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          lead.insurer || "-"
                        )}
                      </td>

                      {/* Comments - Editable */}
                      <td 
                        className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => !editingCell && startEdit(lead, "comments")}
                      >
                        {editingCell?.leadId === lead.id && editingCell.field === "comments" ? (
                          <textarea
                            value={editedValues[lead.id]?.comments || ""}
                            onChange={(e) => updateEditedField("comments", e.target.value)}
                            onBlur={saveEdit}
                            placeholder="Add comments..."
                            rows={2}
                            className="w-full px-2 py-1 border-2 border-teal-500 rounded text-sm focus:outline-none"
                            autoFocus
                          />
                        ) : (
                          <span className="text-gray-600 text-xs">{lead.comments || "-"}</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        {editingCell?.leadId === lead.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={saveEdit}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                              title="Save"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">Click to edit</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}