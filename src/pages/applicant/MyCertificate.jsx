import React, { useState, useEffect } from "react";
import { Eye, Calendar, Award, X, ExternalLink } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthProvider";
import Extract from "@/utils/Extract";
import useGetAllCertificate from "@/hooks/applicant/certificate/useGetApplicantCertificate";
import useGetCertificateInHtml from "@/hooks/applicant/certificate/useGetCertificationInHtml";
import Modal from "@/components/shared/modal/Modal";
import Spinner from "@/components/shared/Spinner";
import useGetApplicantTrack from "@/hooks/applicant/enroll/useGetApplicantTrack";
import { Navigate } from "react-router-dom";
import useGetCertificate from "@/hooks/applicant/certificate/useGetCertificate";

export default function MyCertificate() {
  const { auth } = useAuthContext();
  console.log(auth,'auth auth mmmmm')
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

  console.log(tracks, "tracks tracks tracks",getAllCertificate);
  if (tracks?.data?.length == 0) return <Navigate to="/unAuthorized" />;
  if (isCertificateLoading) return <Spinner color="blue" />;
  if (!auth) return <Navigate to="/login" />;
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
                        <span className="break-words">Issued: {formatDate(cert.issueDate)}</span>
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
                    <span className="whitespace-nowrap">Redirect Certificate</span>
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
                    <div className="text-sm sm:text-lg mt-2">Loading certificate...</div>
                  </div>
                ) : certificateHtml ? (
                  <div
                    className="p-2 sm:p-4 overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: certificateHtml }}
                    style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)' }}
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
