import MovieZWhiteIcon from "../_icons/MovieZWhiteIcon";
import EmailIcon from "../_icons/EmailIcon";
import PhoneIcon from "../_icons/PhoneIcon";

export const Footer = () => {
  return (
    <div className="bg-[#4338CA] w-full h-[280px] py-10 flex justify-center items-center">
      <div className=" flex gap-[120px] justify-between w-7xl h-[200px]">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2  items-center text-[#FAFAFA] text-sm italic font-bold leading-5 tracking-[0.32px] cursor-pointer">
            <MovieZWhiteIcon />
            Movie Z
          </div>
          <div className="text-[#FAFAFA] text-sm font-normal leading-5">
            © 2025 Movie Z. All Rights Reserved.
          </div>
        </div>
        <div className="flex gap-24">
          <div className="flex flex-col gap-3">
            <p className="text-[#FAFAFA] text-sm font-normal leading-5">
              Contact Information
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex gap-3  items-center">
                <EmailIcon />
                <div>
                  <p className="text-[#FAFAFA] text-sm font-normal leading-5 cursor-pointer">
                    Email:
                  </p>
                  <p className="text-[#FAFAFA] text-sm font-normal leading-5 cursor-pointer">
                    support@movieZ.com
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <PhoneIcon />
                <div>
                  <p className="text-[#FAFAFA] text-sm font-normal leading-[20px]cursor-pointer">
                    Phone:
                  </p>
                  <p className="text-[#FAFAFA] text-sm font-normal leading-[20px]cursor-pointer">
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[#FAFAFA] text-sm font-normal leading-5 flex flex-col gap-3">
            <p>Follow us</p>
            <div className="flex gap-3 cursor-pointer">
              <a>Facebook</a>
              <a>Instagram</a>
              <a>Twitter</a>
              <a>Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
