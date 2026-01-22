'use client';

import { useEffect, useState } from 'react';
import { IApplication } from '@/models/Application';
import { Eye, X, Lock, LogIn } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<any | null>(null);

    // const ADMIN_PASS = "JaiShriRam"; // REMOVED FOR SECURITY

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
                fetchApplications();
            } else {
                setError('Invalid Access Code');
            }
        } catch (err) {
            setError('Something went wrong');
        }
    };

    const fetchApplications = () => {
        setLoading(true);
        fetch('/api/applications')
            .then(res => res.json())
            .then(data => {
                setData(data.applications || []);
                setLoading(false);
            });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-om-pattern flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full border-t-8 border-saffron-500"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4 text-saffron-600">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-black font-cinzel text-gray-800">Admin Access</h1>
                        <p className="text-gray-500 text-sm">Restricted Area. Authorized Personnel Only.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Access Code</label>
                            <input
                                type="password"
                                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-saffron-500 outline-none transition text-center text-2xl tracking-widest"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-red-500 text-center font-bold text-sm">{error}</p>}

                        <button
                            type="submit"
                            className="w-full py-4 bg-saffron-600 text-white font-bold rounded-xl shadow-lg hover:bg-saffron-700 transition flex items-center justify-center gap-2"
                        >
                            Enter Dashboard <LogIn size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const handleStatusUpdate = async (status: 'Approved' | 'Rejected') => {
        if (!selectedApp) return;
        try {
            const res = await fetch(`/api/applications/${selectedApp._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                const updatedApp = await res.json();
                setData(data.map(app => (app as any)._id === selectedApp._id ? updatedApp.application : app));
                setSelectedApp(null); // Close the modal
            }
        } catch (error) {
            console.error("Failed to update status");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-saffron-50/50 p-4 md:p-8 font-inter print:bg-white print:p-0">
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-content, .print-content * {
                        visibility: visible;
                    }
                    .print-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="max-w-7xl mx-auto print:hidden">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-saffron-100 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-saffron-600 rounded-lg flex items-center justify-center text-white font-bold font-cinzel text-xl shadow-lg">
                            BD
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-gray-800 font-cinzel">Privileged Dashboard</h1>
                            <p className="text-gray-500 text-xs md:text-sm">Manage & Review Applications</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="bg-saffron-50 text-saffron-800 px-5 py-2 rounded-full font-bold border border-saffron-100 text-sm md:text-base">
                            {data.length} Applicants
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-gray-400 hover:text-red-500 transition"
                            title="Logout"
                        >
                            <Lock size={20} />
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-40 bg-white rounded-xl shadow-sm animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Desktop View: Table */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100/50 backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-saffron-50 border-b border-saffron-100">
                                        <tr>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider">Name</th>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider">Phone & Age</th>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider">Location</th>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider">Applied On</th>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider">Status</th>
                                            <th className="p-5 font-bold text-saffron-900 uppercase text-xs tracking-wider text-center">View</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {data.map((app) => (
                                            <tr key={app._id as unknown as string} className="hover:bg-saffron-50/30 transition group cursor-pointer" onClick={() => setSelectedApp(app)}>
                                                <td className="p-5">
                                                    <div className="font-bold text-gray-800 text-lg">{app.name}</div>
                                                    <div className="text-xs text-gray-400 font-mono truncate max-w-[150px]">{app.email}</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="text-gray-700 font-medium">{app.phone}</div>
                                                    <div className="text-xs text-gray-500">{app.age} Years</div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="text-gray-800 font-medium">{app.presentDistrict}</div>
                                                    <div className="text-xs text-gray-500">{app.presentState}</div>
                                                </td>
                                                <td className="p-5 text-gray-500 text-sm font-medium">
                                                    {new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </td>
                                                <td className="p-5">
                                                    <StatusBadge status={app.status} />
                                                </td>
                                                <td className="p-5 text-center">
                                                    <button
                                                        className="p-3 bg-white border border-gray-200 text-gray-400 rounded-xl hover:bg-saffron-500 hover:text-white hover:border-saffron-500 transition shadow-sm group-hover:scale-105"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile View: Cards */}
                        <div className="md:hidden space-y-4">
                            {data.map((app) => (
                                <div
                                    key={app._id as unknown as string}
                                    onClick={() => setSelectedApp(app)}
                                    className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-transform"
                                >
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-lg text-gray-800">{app.name}</h3>
                                            <StatusBadge status={app.status} small />
                                        </div>
                                        <p className="text-gray-500 text-sm mb-1">{app.presentDistrict}, {app.presentState}</p>
                                        <p className="text-xs text-gray-400 font-mono">{new Date(app.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-saffron-50 rounded-full flex items-center justify-center text-saffron-600">
                                        <Eye size={20} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {data.length === 0 && (
                            <div className="p-20 text-center text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300">
                                <p>No applications received yet.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-saffron-950/40 backdrop-blur-md print:inset-auto print:bg-white print:static print:block">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col print:shadow-none print:max-w-none print:max-h-none print:overflow-visible print-content"
                    >
                        <div className="bg-white border-b border-gray-100 p-6 flex justify-between items-center shrink-0 print:border-b-2 print:border-black">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-cinzel print:text-black">Applicant Review</h2>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold print:text-gray-600">ID: {(selectedApp._id as unknown as string).slice(-6)}</p>
                            </div>
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition print:hidden"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar print:overflow-visible">
                            {/* Personal Info */}
                            <section>
                                <SectionHeader title="Personal Profile" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <DetailItem label="Name" value={selectedApp.name} major />
                                    <DetailItem label="Age" value={selectedApp.age} />
                                    <DetailItem label="Profession" value={selectedApp.profession || '-'} />
                                    <DetailItem label="Phone" value={selectedApp.phone} highlight />
                                    <DetailItem label="WhatsApp" value={selectedApp.whatsapp || '-'} />
                                    <DetailItem label="Email" value={selectedApp.email || '-'} />
                                    <DetailItem label="Qualification" value={selectedApp.qualification || '-'} fullWidth />
                                </div>
                            </section>

                            {/* Present Address */}
                            <section>
                                <SectionHeader title="Present Address" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <DetailItem label="State" value={selectedApp.presentState} />
                                    <DetailItem label="District" value={selectedApp.presentDistrict} />
                                    <DetailItem label="Town" value={selectedApp.presentTown} />
                                    <DetailItem label="Pin Code" value={selectedApp.presentPinCode} />
                                    <DetailItem label="Full Address" value={selectedApp.presentAddress} fullWidth />
                                </div>
                            </section>

                            {/* Permanent Address */}
                            <section>
                                <SectionHeader title="Permanent Address" />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <DetailItem label="State" value={selectedApp.permanentState || '-'} />
                                    <DetailItem label="District" value={selectedApp.permanentDistrict || '-'} />
                                    <DetailItem label="Town" value={selectedApp.permanentTown || '-'} />
                                    <DetailItem label="Pin Code" value={selectedApp.permanentPinCode || '-'} />
                                    <DetailItem label="Full Address" value={selectedApp.permanentPermanentAddress || '-'} fullWidth />
                                </div>
                            </section>

                            {/* Documents */}
                            <section className="print:break-before-page">
                                <SectionHeader title="Documents (Aadhar)" />
                                <div className="grid md:grid-cols-2 gap-8">
                                    <DocumentPreview label="Front Side" src={selectedApp.aadharFront} />
                                    <DocumentPreview label="Back Side" src={selectedApp.aadharBack} />
                                </div>
                            </section>

                            {/* Remark */}
                            {selectedApp.remark && (
                                <section>
                                    <SectionHeader title="Additional Remarks" />
                                    <p className="bg-yellow-50 p-4 rounded-xl text-yellow-900 border border-yellow-100 font-medium print:border print:border-gray-300">{selectedApp.remark}</p>
                                </section>
                            )}
                        </div>

                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 print:hidden">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleStatusUpdate('Approved')}
                                    className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-bold hover:bg-green-200 transition flex-1 md:flex-none"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate('Rejected')}
                                    className="px-6 py-3 bg-red-100 text-red-700 rounded-xl font-bold hover:bg-red-200 transition flex-1 md:flex-none"
                                >
                                    Reject
                                </button>
                            </div>
                            <button
                                onClick={handlePrint}
                                className="w-full md:w-auto px-8 py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition shadow-lg"
                            >
                                Print Application
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <h3 className="flex items-center gap-3 text-sm font-bold text-saffron-600 uppercase tracking-widest mb-6 pb-2 border-b border-gray-100">
            <span className="w-2 h-2 rounded-full bg-saffron-500" />
            {title}
        </h3>
    )
}

function DetailItem({ label, value, fullWidth = false, highlight = false, major = false }: { label: string, value: string | number, fullWidth?: boolean, highlight?: boolean, major?: boolean }) {
    return (
        <div className={`${fullWidth ? "col-span-full" : (major ? "col-span-2" : "")} bg-gray-50/50 p-3 rounded-lg border border-gray-100/50`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            <p className={`font-semibold break-words ${highlight ? "text-saffron-600" : "text-gray-800"} ${major ? "text-lg md:text-xl" : "text-sm md:text-base"}`}>
                {value}
            </p>
        </div>
    )
}

function DocumentPreview({ label, src }: { label: string, src?: string }) {
    return (
        <div className="space-y-3">
            <p className="font-bold text-gray-500 text-xs uppercase tracking-wider pl-1">{label}</p>
            {src ? (
                <div className="relative h-56 w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-saffron-300 transition group cursor-zoom-in">
                    <Image src={src} alt={label} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
            ) : (
                <div className="h-56 w-full bg-red-50 rounded-xl flex items-center justify-center border-2 border-dashed border-red-200 text-red-400 font-bold">
                    Not Uploaded
                </div>
            )}
        </div>
    )
}

function StatusBadge({ status, small }: { status: string, small?: boolean }) {
    const styles = status === 'Approved' ? 'bg-green-100 text-green-700 border-green-200' :
        status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-200' :
            'bg-yellow-100 text-yellow-700 border-yellow-200';

    return (
        <span className={`px-3 py-1 rounded-full font-bold uppercase border ${styles} ${small ? "text-[10px]" : "text-xs"}`}>
            {status}
        </span>
    )
}
