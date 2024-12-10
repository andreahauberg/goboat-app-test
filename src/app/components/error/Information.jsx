import { useLanguage } from "@/app/lib/context/language";
import informationData from "@/app/lib/content/information";
import Image from "next/image";

const Information = () => {
  const { language } = useLanguage();
  const data = informationData[language] || informationData.en;

  return (
    <div className="py-6">
      <h2 className="text-xl font-bold">Information</h2>
      <div className="space-y-4 p-3">
        {/* Address */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <Image
              src="/Icons/map-pin.svg"
              alt="Address Icon"
              width={20}
              height={20}
            />
          </div>
          <div>
            <p className="font-semibold">{data.adress}</p>
            <p>Islands Brygge 10, 2300 København S</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <Image
              src="/Icons/phone.svg"
              alt="Phone Icon"
              width={20}
              height={20}
            />
          </div>
          <div>
            <p className="font-semibold">{data.phone}</p>
            <p>+45 40 26 10 25</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <Image
              src="/Icons/mail.svg"
              alt="Email Icon"
              width={20}
              height={20}
            />
          </div>
          <div>
            <p className="font-semibold">{data.email}</p>
            <p>Info@goboat.dk</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;