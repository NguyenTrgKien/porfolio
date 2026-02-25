import { createContext, useEffect, useState, type ReactNode } from "react";

type DeviceType = "mobile" | "desktop";

export interface DeviceContextType {
  isMobile: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DeviceContext = createContext<DeviceContextType | undefined>(
  undefined,
);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const getDeviceType = (): DeviceType => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    return "desktop";
  };

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType);

  useEffect(() => {
    const handleResize = () => setDeviceType(getDeviceType());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isMobile: deviceType === "mobile",
        isDesktop: deviceType === "desktop",
        deviceType,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}
