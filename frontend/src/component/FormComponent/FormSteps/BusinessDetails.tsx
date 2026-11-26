
import { useFormik } from 'formik';
import {
    User,
    Users,
    Building2,
    Mail,
    Phone,
    MessageCircle,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    MapPin,
    Globe,
} from 'lucide-react'
import { BusinessDetailsSchemaValidation, type BusinessValidationSchemaData } from '../../../schema/validationSchema';

const BusinessDetails = () => {

    const formik = useFormik({
        initialValues: { 
            businessName: "",
            ownerName: "",
            targetAudience: "",
            email: "",
            contactNumber: "",
            whatsappNumber: "",
            sameAsContact: false,
            address: {
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: ""
            },
            socialLinks: {
                instagram: "",
                facebook: "",
                youtube: "",
            }
         },
        validationSchema: BusinessDetailsSchemaValidation,
        onSubmit: (values)=>{
            alert()
            console.log(values)
        },
    });
    const { values, errors, handleChange, handleBlur, handleSubmit, touched } = formik;

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden"
        >

            <div className="px-6 py-6 sm:px-8 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4F46E5] mb-1.5">
                    <span>Step 1 of 6</span>
                    <span className="text-[#94A3B8]">•</span>
                    <span>Foundation</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                    Business Details
                </h1>
                <p className="text-sm text-[#475569] mt-1">
                    Tell us about your business, primary point of contact, location, and online presence so our AI can tailor your website content.
                </p>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
                <section aria-labelledby="section-identity">
                    <div className="mb-4">
                        <h2
                            id="section-identity"
                            className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                        >
                            <Building2 className="w-4 h-4 text-[#4F46E5]" />
                            <span>Core Business Identity</span>
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                            Essential details used for branding, copyright footers, and AI copywriting tone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label
                                htmlFor="businessName"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Business Name <span className="text-[#4F46E5]">*</span>
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <Building2 className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="businessName"
                                    name="businessName"
                                    type="text"
                                    required
                                    value={values.businessName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g., Acme Digital Studio"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.businessName
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                        : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>
                            {touched.businessName && errors.businessName && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.businessName}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="ownerName"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Owner Name <span className="text-[#4F46E5]">*</span>
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <User className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="ownerName"
                                    name="ownerName"
                                    type="text"
                                    required
                                    value={values.ownerName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="e.g., Jordan Taylor"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.ownerName
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                        : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>
                            {touched.ownerName && errors.ownerName && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.ownerName}</span>
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="targetAudience"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Target Audience
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <Users className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="targetAudience"
                                    name="targetAudience"
                                    type="text"
                                    value={values.targetAudience}
                                    onChange={handleChange}
                                    placeholder="e.g., Small business owners, B2B SaaS founders, local homeowners aged 25–45"
                                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>
                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                                Describe your ideal customers or demographics so our AI can craft resonant messaging.
                            </p>
                        </div>
                    </div>
                </section>

                <hr className="border-[#E2E8F0]" />

                <section aria-labelledby="section-contact">
                    <div className="mb-4">
                        <h2
                            id="section-contact"
                            className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4 text-[#4F46E5]" />
                            <span>Contact Information</span>
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                            Direct communication channels for website contact forms, headers, and floating chat buttons.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Email Address <span className="text-[#4F46E5]">*</span>
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <Mail className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="hello@business.com"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.email
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                        : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.email}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="contactNumber"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Contact Number <span className="text-[#4F46E5]">*</span>
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <Phone className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="contactNumber"
                                    name="contactNumber"
                                    type="tel"
                                    required
                                    value={values.contactNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="+1 (555) 234-5678"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.contactNumber
                                        ? 'border-red-400 focus:border-red-500 focus:ring-red-500/15'
                                        : 'border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>
                            {touched.contactNumber && errors.contactNumber && (
                                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{errors.contactNumber}</span>
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="whatsappNumber"
                                    className="block text-sm font-medium text-[#0F172A]"
                                >
                                    WhatsApp Number
                                </label>
                            </div>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">
                                    <MessageCircle className="h-4 w-4 text-[#94A3B8]" />
                                </div>
                                <input
                                    id="whatsappNumber"
                                    name="whatsappNumber"
                                    type="tel"
                                    disabled={values.sameAsContact}
                                    value={values.whatsappNumber}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 234-5678"
                                    className={`block w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border transition-colors focus:outline-none focus:ring-2 ${values.sameAsContact
                                        ? 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] cursor-not-allowed'
                                        : 'bg-[#FFFFFF] text-[#0F172A] placeholder-[#94A3B8] border-[#E2E8F0] focus:border-[#4F46E5] focus:ring-[#4F46E5]/15'
                                        }`}
                                />
                            </div>

                            <label className="mt-2 inline-flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="sameAsContact"
                                    checked={values.sameAsContact}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#4F46E5] focus:ring-[#4F46E5]/20 accent-[#4F46E5]"
                                />
                                <span className="text-xs text-[#475569]">
                                    Same as Contact Number
                                </span>
                            </label>
                        </div>
                    </div>
                </section>

                <hr className="border-[#E2E8F0]" />

                <section aria-labelledby="section-address">
                    <div className="mb-4">
                        <h2
                            id="section-address"
                            className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                        >
                            <MapPin className="w-4 h-4 text-[#4F46E5]" />
                            <span>Address Details</span>
                        </h2>
                        <p className="text-xs text-[#475569] mt-0.5">
                            Physical business location for local SEO schema, Google Maps embeds, and store footers.
                        </p>
                    </div>

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 space-y-4">
                        <div>
                            <label
                                htmlFor="street"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Street Address
                            </label>
                            <input
                                id="street"
                                type="text"
                                value={values.address.street}
                                onChange={handleChange}
                                placeholder="e.g., 742 Evergreen Terrace, Suite 200"
                                className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                                >
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    value={values.address.city}
                                    onChange={handleChange}
                                    placeholder="e.g., San Francisco"
                                    className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="state"
                                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                                >
                                    State / Province
                                </label>
                                <input
                                    id="state"
                                    type="text"
                                    value={values.address.state}
                                    onChange={handleChange}
                                    placeholder="e.g., California"
                                    className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                                >
                                    Country
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    value={values.address.country}
                                    onChange={handleChange}
                                    placeholder="e.g., United States"
                                    className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="postalCode"
                                    className="block text-sm font-medium text-[#0F172A] mb-1.5"
                                >
                                    Postal Code
                                </label>
                                <input
                                    id="postalCode"
                                    type="text"
                                    value={values.address.postalCode}
                                    onChange={handleChange}
                                    placeholder="e.g., 94107"
                                    className="block w-full px-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-[#E2E8F0]" />

                <section aria-labelledby="section-social">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2
                                id="section-social"
                                className="text-base font-semibold text-[#0F172A] flex items-center gap-2"
                            >
                                <Globe className="w-4 h-4 text-[#4F46E5]" />
                                <span>Social Links</span>
                            </h2>
                            <p className="text-xs text-[#475569] mt-0.5">
                                Connect your active social profiles to automatically link social icons on your site.
                            </p>
                        </div>
                        <span className="text-xs font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
                            Optional
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label
                                htmlFor="instagram"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Instagram URL
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">

                                </div>
                                <input
                                    id="instagram"
                                    type="url"
                                    value={values.socialLinks.instagram}
                                    onChange={handleChange}
                                    placeholder="https://instagram.com/yourbrand"
                                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="facebook"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                Facebook URL
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">

                                </div>
                                <input
                                    id="facebook"
                                    type="url"
                                    value={values.socialLinks.facebook}
                                    onChange={handleChange}
                                    placeholder="https://facebook.com/yourbrand"
                                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="youtube"
                                className="block text-sm font-medium text-[#0F172A] mb-1.5"
                            >
                                YouTube URL
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3.5 flex items-center">

                                </div>
                                <input
                                    id="youtube"
                                    type="url"
                                    value={values.socialLinks.youtube}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/@yourbrand"
                                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm text-[#0F172A] placeholder-[#94A3B8] bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] transition-colors focus:outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 py-4 sm:px-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg cursor-not-allowed opacity-75"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <span className="text-xs text-[#94A3B8] text-center sm:text-right">
                        Required fields marked with <span className="text-[#4F46E5] font-semibold">*</span>
                    </span>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-lg shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                    >
                        <span>Save & Continue to Project Details</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </form>
    )
};


export default BusinessDetails;