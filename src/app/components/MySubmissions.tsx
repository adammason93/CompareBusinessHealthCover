import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { FileText, Calendar, User, Mail, Phone, X, Loader2 } from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface MySubmissionsProps {
  isOpen: boolean;
  onClose: () => void;
  authToken: string | null;
  user: any;
}

interface Submission {
  id: string;
  data: any;
  created_at: string;
}

export function MySubmissions({ isOpen, onClose, authToken, user }: MySubmissionsProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    if (isOpen && user && authToken) {
      fetchSubmissions();
    }
  }, [isOpen, user, authToken]);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Fetching submissions...');
      console.log('Auth token:', authToken ? `${authToken.substring(0, 20)}...` : 'null');
      console.log('User ID:', user?.id);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-2031af1c/user-submissions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch submissions: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Submissions fetched:', result);
      setSubmissions(result.submissions || []);
    } catch (err: any) {
      console.error("Error fetching submissions:", err);
      setError(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCoverTypeLabel = (coverType: string) => {
    const labels: { [key: string]: string } = {
      individual: "Individual",
      couple: "Couple",
      family: "Family",
      company: "Company",
    };
    return labels[coverType] || coverType;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[95vw] sm:!max-w-[700px] md:!max-w-[900px] !w-auto max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">My Submissions</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-brand-teal" />
              <span className="ml-3 text-gray-600">Loading submissions...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">{error}</div>
              <Button onClick={fetchSubmissions} variant="outline">
                Try Again
              </Button>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Submissions Yet</h3>
              <p className="text-gray-600">You haven't submitted any forms yet.</p>
            </div>
          ) : selectedSubmission ? (
            <div>
              <Button
                onClick={() => setSelectedSubmission(null)}
                variant="ghost"
                className="mb-4"
              >
                ← Back to List
              </Button>
              <div className="bg-white border rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Submission Details</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(selectedSubmission.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Personal Information */}
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Personal Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {selectedSubmission.data.firstName} {selectedSubmission.data.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {selectedSubmission.data.email}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {selectedSubmission.data.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {selectedSubmission.data.dob || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cover Information */}
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Cover Information</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Cover Type:</span>{" "}
                        <span className="font-medium text-gray-900">
                          {getCoverTypeLabel(selectedSubmission.data.coverType)}
                        </span>
                      </div>
                      {selectedSubmission.data.coverStartDate && (
                        <div>
                          <span className="text-gray-600">Start Date:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {selectedSubmission.data.coverStartDate}
                          </span>
                        </div>
                      )}
                      {selectedSubmission.data.budget && (
                        <div>
                          <span className="text-gray-600">Budget:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {selectedSubmission.data.budget}
                          </span>
                        </div>
                      )}
                      {selectedSubmission.data.currentInsurance && (
                        <div>
                          <span className="text-gray-600">Current Insurance:</span>{" "}
                          <span className="font-medium text-gray-900">
                            {selectedSubmission.data.currentInsurance}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Details */}
                  {selectedSubmission.data.additionalInfo && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Additional Information</h4>
                      <p className="text-sm text-gray-700 bg-brand-surface p-4 rounded-lg">
                        {selectedSubmission.data.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-teal hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-brand-teal-muted rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-brand-teal-hover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {getCoverTypeLabel(submission.data.coverType)} Cover Application
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(submission.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-13 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="w-3.5 h-3.5" />
                          <span>
                            {submission.data.firstName} {submission.data.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{submission.data.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{submission.data.phone}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-brand-teal-hover hover:text-brand-teal-hover">
                      View Details →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-brand-surface">
          <Button onClick={onClose} variant="outline" className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}