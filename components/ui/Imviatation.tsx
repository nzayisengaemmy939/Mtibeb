import React, { useState } from "react";
import { GlassmorphismCard } from "@/app/page";
import { InteractiveButton } from "@/app/page";
import toast from "react-hot-toast";

const sendInvitation = async (
  invitationData: {
    vendorEmail: string;
    venderFirstname: string;
    VenderOtherName: string;
  },
  apiEndpoint = "/api/send-invitation"
) => {
  try {
    const { vendorEmail, venderFirstname, VenderOtherName } = invitationData;

    if (!vendorEmail || !venderFirstname || !VenderOtherName) {
      throw new Error(
        "All fields are required: vendorEmail, venderFirstname, VenderOtherName"
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(vendorEmail)) {
      throw new Error("Please enter a valid email address");
    }

    // <-- change here: send keys matching backend exactly
    const invitation = {
      VendorEmail: vendorEmail.trim(),
      VendorFirstName: venderFirstname.trim(),
      VendorOtherName: VenderOtherName.trim(),
    };

    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const result = await response.json();

    return {
      success: true,
      message: `Invitation sent successfully to ${venderFirstname} ${VenderOtherName}`,
      data: result,
    };
  }  catch (error: unknown) {
  console.error("Send invitation error:", error);
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  return {
    success: false,
    message: errorMessage,
    data: null,
  };

   
  }
};


const Invitation = () => {
  const [formData, setFormData] = useState({
    vendorEmail: "",
    venderFirstname: "",
    VenderOtherName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

 const handleSendInvitation = async () => {
  setIsLoading(true);
  console.log("Button clicked");

  try {
    const result = await sendInvitation(
      formData,
      `${process.env.NEXT_PUBLIC_API_URL}/admin/invite`
    );

    if (result.success) {
      toast.success(result.message);
      console.log("Success:", result.data);

      setFormData({
        vendorEmail: "",
        venderFirstname: "",
        VenderOtherName: "",
      });
    } else {
      toast.error(`Error: ${result.message}`);
      console.error("Error:", result.message);
    }
  } catch (error: unknown) {
  console.error("Send invitation error:", error);
  const errorMessage =
    error instanceof Error ? error.message : "An unknown error occurred";
  return {
    success: false,
    message: errorMessage,
    data: null,
  };

  } finally {
    setIsLoading(false);
  }
};

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1A1A2E] to-[#16213E]" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "slideGrid 20s linear infinite",
          }}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <GlassmorphismCard className="p-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-white">
                Join Our Artisan Network
              </h3>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Know a talented artisan or furniture vendor? Invite them to join
                our platform and share their creations with the world.
              </p>
            </div>
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    placeholder: "✉️ Vendor Email",
                    type: "email",
                    field: "vendorEmail",
                    value: formData.vendorEmail,
                  },
                  {
                    placeholder: "👤 First Name",
                    type: "text",
                    field: "venderFirstname",
                    value: formData.venderFirstname,
                  },
                  {
                    placeholder: "👤 Last Name",
                    type: "text",
                    field: "VenderOtherName",
                    value: formData.VenderOtherName,
                  },
                ].map((field, index) => (
                  <div key={index} className="relative">
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={(e) =>
                        handleInputChange(field.field, e.target.value)
                      }
                      disabled={isLoading}
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}
              </div>
              <InteractiveButton
                variant="primary"
                onClick={handleSendInvitation}
                disabled={isLoading}
              >
                {isLoading ? "⏳ Sending..." : "🚀 Send Invitation"}
              </InteractiveButton>
            </div>
          </div>
        </GlassmorphismCard>
      </div>
    </section>
  );
};

export default Invitation;
