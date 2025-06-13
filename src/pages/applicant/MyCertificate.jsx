import React, { useState, useEffect } from "react";
import {
  Eye,
  Calendar,
  Award,
  X,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { useAuthContext } from "@/contexts/AuthProvider";
import Extract from "@/utils/Extract";
import useGetAllCertificate from "@/hooks/applicant/certificate/useGetApplicantCertificate";
import useGetCertificateInHtml from "@/hooks/applicant/certificate/useGetCertificationInHtml";
import Modal from "@/components/shared/modal/Modal";
import Spinner from "@/components/shared/Spinner";
import useGetApplicantTrack from "@/hooks/applicant/enroll/useGetApplicantTrack";
import { Navigate, useNavigate } from "react-router-dom";
import useGetCertificate from "@/hooks/applicant/certificate/useGetCertificate";
import Back from "@/components/shared/dashboard/Back";

export default function MyCertificate() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  console.log(auth, "auth auth mmmmm");
  if (auth) {
    var name = Extract(auth, "unique_name");
    var id = Extract(auth, "nameid");
  }
  const { data: tracks } = useGetApplicantTrack(id);
  const [selectedCertificateCode, setSelectedCertificateCode] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const { data: getAllCertificate, isLoading: isCertificateLoading } =
    useGetAllCertificate();
  const { data: certificateHtml, isLoading: isHtmlLoading } =
    useGetCertificateInHtml(selectedCertificateCode, !!selectedCertificateCode);
  const { data: certificateView, isLoading: isCerViewLoading } =
    useGetCertificate(selectedCertificateCode, !!selectedCertificateCode);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleViewCertificate = (certificate) => {
    setSelectedCertificateCode(certificate.verificationCode);
    setShowCertificateModal(true);
  };

  const handleCloseCertificate = () => {
    setShowCertificateModal(false);
    setSelectedCertificateCode(null);
  };

  const handleDownloadPdf = (verificationCode) => {
    const pdfUrl = `${
      import.meta.env.VITE_API
    }api/Certificates/${verificationCode}/pdf`;
    window.open(pdfUrl, "_blank");
  };

  const handleRedirectToCertificate = (verificationCode) => {
    const certificateUrl = `${
      import.meta.env.VITE_API
    }api/Certificates/${verificationCode}`;
    window.open(certificateUrl, "_blank");
  };

  console.log(tracks, "tracks tracks tracks", getAllCertificate);
  if (!auth) return <Navigate to="/login" />;
  if (tracks?.data?.length == 0) return <Navigate to="/unAuthorized" />;
  if (isCertificateLoading)
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Spinner color="blue" />
      </div>
    );
  if (getAllCertificate?.data.length == 0)
    return (
      <div className="px-4 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600 px-4 py-3 "  >
          <div className="flex items-center space-x-1" onClick={() => navigate("/applicant")}>
            <svg
              className="w-4 h-4 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-blue-500 hover:text-blue-600 cursor-pointer">
              Dashboard
            </span>
          </div>

          <span className="text-gray-400">→</span>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-blue-500 cursor-pointer ">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-blue-500 cursor-pointer">My Certificate</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No Certificate Yet
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You haven't earned your first certificate yet. Keep going - you're
              on the right track!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                💡 Complete first level to earn your first certificate
              </p>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-medium py-3 px-6 rounded-lg transition-colors"
              onClick={() => navigate("/applicant")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen mt-4 sm:mt-8">
      <div className="bg-[#E7ECFF] border-b py-3 sm:py-4 px-3 sm:px-6 mb-4 sm:mb-8 rounded-lg w-[95%] sm:w-[90%] mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold font-mono text-[var(--main-color)] text-center">
          My Certificate
        </h1>
      </div>
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="space-y-4">
          {getAllCertificate?.data?.map((cert) => (
            <div
              key={cert.id}
              className="bg-white cursor-pointer rounded-lg border border-gray-200 p-3 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 capitalize break-words">
                      {name} Certificate
                    </h3>
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="break-words">
                          Issued: {formatDate(cert.issueDate)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Level Progress: {cert.levelProgressId}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 sm:ml-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleViewCertificate(cert)}
                    className="flex items-center justify-center bg-[var(--main-color)] cursor-pointer gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 w-full xs:w-[80%]"
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#2563eb")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#3b82f6")
                    }
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap">View Certificate</span>
                  </button>
                  <button
                    onClick={() =>
                      handleRedirectToCertificate(cert.verificationCode)
                    }
                    className="flex items-center bg-[var(--secondary-color)] justify-center cursor-pointer gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 w-full xs:w-[80%]"
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#002952")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#003f7dde")
                    }
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap">
                      Redirect Certificate
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showCertificateModal && (
        <Modal>
          <div className="bg-white rounded-lg w-[95vw] sm:max-w-5xl max-h-[90vh] overflow-hidden flex flex-col mx-2 sm:mx-auto">
            <div className="py-3 sm:py-6 px-2 sm:px-3">
              <div className="flex items-center justify-between p-2 sm:p-4 border-b">
                <h2 className="text-lg sm:text-xl font-semibold font-mono">
                  Certificate Preview
                </h2>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => handleDownloadPdf(selectedCertificateCode)}
                    className="flex items-center cursor-pointer gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Download PDF</span>
                    <span className="xs:hidden">PDF</span>
                  </button>
                  <button
                    onClick={handleCloseCertificate}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto">
                {isHtmlLoading ? (
                  <div className=" flex flex-col items-center justify-center h-32 sm:h-64">
                    <Spinner color="blue" />
                    <div className="text-sm sm:text-lg mt-2">
                      Loading certificate...
                    </div>
                  </div>
                ) : certificateHtml ? (
                  <div
                    className="p-2 sm:p-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: certificateHtml }}
                    style={{ fontSize: "clamp(0.75rem, 2.5vw, 1rem)" }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-32 sm:h-64">
                    <div className="text-sm sm:text-lg text-gray-500">
                      Failed to load certificate
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
