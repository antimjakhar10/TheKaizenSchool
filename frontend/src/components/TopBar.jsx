import { useEffect, useState } from "react";
import { MapPin, Phone, Trophy } from "lucide-react";
import { getPublicSettings } from "../services/publicApi";

const TopBar = () => {
  const [settings, setSettings] = useState({
    address: "Badopal Road, Bhana, Haryana - 125123",
    phone1: "9468023823",
    phone2: "9467818529",
    motto: "Read • Lead • Succeed",
  });

  useEffect(() => {
    getPublicSettings().then((data) => {
      if (data) setSettings(data);
    });
  }, []);

  return (
    <div className="bg-[#06264d] text-white">
      <div className="mx-auto flex min-h-[38px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-4 overflow-hidden text-xs font-semibold sm:gap-5 sm:text-sm">

          {/* Location */}
          <div className="flex shrink-0 items-center gap-1.5">
            <MapPin
              size={13}
              strokeWidth={2.5}
              className="text-[#f5b400]"
            />

            <span className="hidden sm:inline">
              {settings.address}
            </span>

            <span className="sm:hidden">
              Bhana, 125123
            </span>
          </div>

          {/* Phone */}
          <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <Phone
              size={13}
              strokeWidth={2.5}
              className="text-[#f5b400]"
            />

            <span>
              {settings.phone1}
              {settings.phone2 ? `, ${settings.phone2}` : ""}
            </span>
          </div>

          {/* Instagram */}
          <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
            <span className="text-sm text-[#f5b400]">@</span>

            <span>the_kaizen_school_bhana</span>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1.5 text-xs font-bold sm:text-sm">
          <Trophy
            size={13}
            strokeWidth={2.5}
            className="text-[#f5b400]"
          />

          <span>
            {settings.motto || "Read • Lead • Succeed"}
          </span>
        </div>

      </div>
    </div>
  );
};

export default TopBar;