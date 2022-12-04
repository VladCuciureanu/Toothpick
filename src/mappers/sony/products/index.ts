import { Device } from "src/types";

function populate(device: Device) {
  // Populate icon and model
  switch (device.productId) {
    case SonyProducts.Models.WH1000XM4:
      // device.icon = { source: "icons/devices/apple/airpods.svg" };
      break;
  }

  // Return populated device
  return device;
}

const SonyProducts = {
  Models: {
    WH1000XM4: "0x0D58",
  },
  populate,
};

export default SonyProducts;
