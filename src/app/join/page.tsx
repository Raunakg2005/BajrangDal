'use client';

import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Upload } from 'lucide-react';

export default function JoinPage() {
    const [formData, setFormData] = useState({
        // Personal
        name: '',
        age: '',
        profession: '',
        phone: '',
        whatsapp: '',
        email: '',
        qualification: '',

        // Present Address
        presentState: '',
        presentDistrict: '',
        presentTown: '',
        presentTehsil: '',
        presentHouseNo: '',
        presentAddress: '',
        presentPinCode: '',

        // Permanent Address
        permanentState: '',
        permanentDistrict: '',
        permanentTown: '',
        permanentTehsil: '',
        permanentHouseNo: '',
        permanentPermanentAddress: '',
        permanentPinCode: '',

        remark: '',
        aadharFront: '',
        aadharBack: ''
    });

    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    // Compress to JPEG at 0.7 quality
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
            };
        });
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: 'aadharFront' | 'aadharBack') => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Determine file type and size usage, but just compress everything to be safe
                const compressedBase64 = await compressImage(file);
                setFormData(prev => ({ ...prev, [field]: compressedBase64 }));
            } catch (error) {
                console.error("Compression failed", error);
            }
        }
    };

    const handleSameAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSameAsPresent(e.target.checked);
        if (e.target.checked) {
            setFormData(prev => ({
                ...prev,
                permanentState: prev.presentState,
                permanentDistrict: prev.presentDistrict,
                permanentTown: prev.presentTown,
                permanentTehsil: prev.presentTehsil,
                permanentHouseNo: prev.presentHouseNo,
                permanentPermanentAddress: prev.presentAddress,
                permanentPinCode: prev.presentPinCode,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                permanentState: '',
                permanentDistrict: '',
                permanentTown: '',
                permanentTehsil: '',
                permanentHouseNo: '',
                permanentPermanentAddress: '',
                permanentPinCode: '',
            }));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        console.log("Submitting form data", formData);

        try {
            const res = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, age: Number(formData.age) }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed');
            }

            setStatus('success');
            // Reset form optional if redirecting or showing success message
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-saffron-50 px-4 font-inter">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-lg border-t-8 border-saffron-500">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-gray-800 mb-4 font-cinzel">Application Submitted!</h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Your application to join Bajrang Dal has been received. We will contact you soon. Jai Shri Ram!
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-saffron-600 text-white rounded-full font-bold hover:bg-saffron-700 transition"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-om-pattern flex flex-col items-center justify-center py-12 px-4 font-inter">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-4xl bg-white rounded-xl shadow-[0_10px_60px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100"
            >
                <div className="bg-gradient-to-r from-saffron-600 to-saffron-500 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-20" />
                    <h1 className="text-3xl md:text-4xl font-black font-cinzel relative z-10 mb-2">Join Bajrang Dal</h1>
                    <p className="relative z-10 font-medium text-saffron-100">Official Membership Aplication Form</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">

                    {/* 1. Applicant Information */}
                    <Section title="Applicant Information / आवेदक का नाम">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input name="name" label="Name / नाम" value={formData.name} onChange={handleChange} required />
                            <Input name="age" label="Age / आयु" type="number" value={formData.age} onChange={handleChange} required />
                            <Input name="profession" label="Profession / व्यवसाय" value={formData.profession} onChange={handleChange} />
                            <Input name="qualification" label="Qualification / शिक्षा" value={formData.qualification} onChange={handleChange} />
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            <Input name="phone" type="tel" label="Phone Number / संपर्क सूत्र" value={formData.phone} onChange={handleChange} required />
                            <Input name="whatsapp" type="tel" label="WhatsApp Number / व्हाट्स नंबर" value={formData.whatsapp} onChange={handleChange} />
                            <Input name="email" type="email" label="Email ID / इमेल" value={formData.email} onChange={handleChange} />
                        </div>
                    </Section>

                    {/* 2. Present Address */}
                    <Section title="Present Address / वर्तमान पता">
                        <div className="grid md:grid-cols-3 gap-6">
                            <Input name="presentState" label="State / राज्य" value={formData.presentState} onChange={handleChange} required placeholder="e.g. Uttar Pradesh" />
                            <Input name="presentDistrict" label="District / जिला" value={formData.presentDistrict} onChange={handleChange} required />
                            <Input name="presentTown" label="Town/Locality / नगर" value={formData.presentTown} onChange={handleChange} required />
                            <Input name="presentTehsil" label="Tehsil / Taluk / तहसील" value={formData.presentTehsil} onChange={handleChange} />
                            <Input name="presentHouseNo" label="House No. / घर नंबर" value={formData.presentHouseNo} onChange={handleChange} required />
                            <Input name="presentPinCode" label="Pin Code / पिन कोड" value={formData.presentPinCode} onChange={handleChange} required />
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Address / पता <span className="text-red-500">*</span></label>
                            <textarea
                                name="presentAddress"
                                required
                                rows={2}
                                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-saffron-500 outline-none transition resize-none bg-gray-50 focus:bg-white"
                                value={formData.presentAddress}
                                onChange={handleChange}
                            />
                        </div>
                    </Section>

                    {/* 3. Permanent Address */}
                    <Section title="Permanent Address / स्थाई पता">
                        <div className="flex items-center gap-3 mb-6 bg-saffron-50 p-4 rounded-lg border border-saffron-100">
                            <input
                                type="checkbox"
                                id="sameAddress"
                                checked={sameAsPresent}
                                onChange={handleSameAddressChange}
                                className="w-5 h-5 text-saffron-600 rounded focus:ring-saffron-500 border-gray-300"
                            />
                            <label htmlFor="sameAddress" className="font-bold text-gray-800 cursor-pointer">Same as present address / वर्तमान पते के समान</label>
                        </div>

                        {!sameAsPresent && (
                            <div className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <Input name="permanentState" label="State / राज्य" value={formData.permanentState} onChange={handleChange} />
                                    <Input name="permanentDistrict" label="District / जिला" value={formData.permanentDistrict} onChange={handleChange} />
                                    <Input name="permanentTown" label="Town/Locality / नगर" value={formData.permanentTown} onChange={handleChange} />
                                    <Input name="permanentTehsil" label="Tehsil / Taluk / तहसील" value={formData.permanentTehsil} onChange={handleChange} />
                                    <Input name="permanentHouseNo" label="House No. / घर नंबर" value={formData.permanentHouseNo} onChange={handleChange} />
                                    <Input name="permanentPinCode" label="Pin Code / पिन कोड" value={formData.permanentPinCode} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address / पता</label>
                                    <textarea
                                        name="permanentPermanentAddress"
                                        rows={2}
                                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-saffron-500 outline-none transition resize-none bg-gray-50 focus:bg-white"
                                        value={formData.permanentPermanentAddress}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}
                    </Section>

                    {/* 4. Documents */}
                    <Section title="Documents / दस्तावेज">
                        <div className="grid md:grid-cols-2 gap-8">
                            <FileUpload
                                label="Front Aadhar Card Scan Copy / आधार कार्ड (आगे)"
                                onChange={(e) => handleFileChange(e, 'aadharFront')}
                                value={formData.aadharFront}
                                required
                            />
                            <FileUpload
                                label="Back Aadhar Card Scan Copy / आधार कार्ड (पीछे)"
                                onChange={(e) => handleFileChange(e, 'aadharBack')}
                                value={formData.aadharBack}
                                required
                            />
                        </div>
                    </Section>

                    <div className="pt-6 border-t border-gray-100">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Remark / टिप्पणी</label>
                        <textarea
                            name="remark"
                            rows={3}
                            placeholder="Any special skills or information..."
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-saffron-500 outline-none transition resize-none bg-gray-50 focus:bg-white"
                            value={formData.remark}
                            onChange={handleChange}
                        />
                    </div>

                    {status === 'error' && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-center font-medium">
                            We faced an issue submitting your form. Please check your internet or try again.
                        </div>
                    )}

                    <button
                        disabled={status === 'submitting'}
                        type="submit"
                        className="w-full py-5 bg-gradient-to-r from-saffron-600 to-saffron-500 text-white font-bold text-xl rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Submitting Application...' : (
                            <>
                                Submit Membership Application <Send size={24} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-lg">
            <h3 className="text-xl font-bold text-saffron-800 border-b-2 border-saffron-100 pb-2 mb-6 uppercase tracking-wide">
                {title}
            </h3>
            {children}
        </div>
    )
}

function Input({ label, required, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-saffron-500 outline-none transition bg-gray-50 focus:bg-white"
            />
        </div>
    )
}

function FileUpload({ label, required, onChange, value }: { label: string, required?: boolean, onChange: (e: ChangeEvent<HTMLInputElement>) => void, value?: string }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`relative border-2 border-dashed rounded-xl p-4 text-center transition group overflow-hidden ${value ? "border-saffron-500 bg-saffron-50" : "border-gray-300 hover:border-saffron-400 hover:bg-saffron-50"}`}>
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={onChange}
                    required={!value && required}
                />

                {value ? (
                    <div className="relative h-48 w-full">
                        <img src={value} alt="Preview" className="h-full w-full object-contain mx-auto rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="font-bold">Click to Change</span>
                        </div>
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                            <CheckCircle size={16} />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500 group-hover:text-saffron-600 py-8">
                        <Upload size={32} />
                        <span className="text-sm font-medium">Click to upload photo</span>
                        <span className="text-xs text-gray-400">(Max 5MB)</span>
                    </div>
                )}
            </div>
        </div>
    )
}
