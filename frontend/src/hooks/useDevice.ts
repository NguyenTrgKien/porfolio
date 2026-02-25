import { useContext } from "react";
import {
  DeviceContext,
  type DeviceContextType,
} from "../contexts/DeviceContext";

export function useDevice(): DeviceContextType {
  const context = useContext(DeviceContext);
  if (!context)
    throw new Error("useDevice must be used within a DeviceProvider");
  return context;
}
