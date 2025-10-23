"use client";
import { Autocomplete, Box, Button, Divider, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import CustomTextFieldAddress from "./CustomTextFieldAddress";
import { Address, AddressType } from "@/app/types";
import { useAuthContext } from "@/app/context/AuthContext";
import { addAddressesService, updateAddressService } from "@/app/services/addressService";

type IOption = {
  label: string;
  value: string | number;
};
type Location = {
  name: string;
  code: string;
};
type TPropAddressForm = {
  //setListAddress: (listAddress: AddressType[]) => void;
  setListAddress: Dispatch<SetStateAction<AddressType[]>>;
  setAddressDefault: (address: AddressType) => void;
  handleClose: () => void;
  showAddressForm: { id: string | number; open: boolean };
  addressUpdate: AddressType;
};
const AddressForm = ({
  setListAddress,
  handleClose,
  addressUpdate,
  showAddressForm,
  setAddressDefault,
}: TPropAddressForm) => {
  console.log("kkkkkkkkkk", addressUpdate);
  const [cities, setCities] = useState<IOption[]>([]);
  const [districts, setDistricts] = useState<IOption[]>([]);
  const [wards, setWards] = useState<IOption[]>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<IOption | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<IOption | null>(null);
  const [selectedWard, setSelectedWard] = useState<IOption | null>(null);

  const [showArea, setShowArea] = useState<string[]>([]);
  const [optionAddress, setOptionAddress] = useState<IOption[]>([]);
  const [currentTab, setCurrentTab] = useState<"city" | "district" | "ward">("city");
  const { user } = useAuthContext();
  // 🔹 Lấy danh sách tỉnh
  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((res) => setCities(res.data.map((c: Location) => ({ label: c.name, value: c.code }))))
      .catch(console.error);
  }, []);

  // 🔹 Khi chọn tỉnh -> lấy danh sách quận/huyện
  useEffect(() => {
    if (selectedCity) {
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedCity.value}?depth=2`)
        .then((res) =>
          setDistricts(res.data.districts.map((d: Location) => ({ label: d.name, value: d.code }))),
        );
      // reset
      setSelectedDistrict(null);
      setSelectedWard(null);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedCity]);

  // 🔹 Khi chọn quận -> lấy phường
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`)
        .then((res) =>
          setWards(res.data.wards.map((w: Location) => ({ label: w.name, value: w.code }))),
        );
      setSelectedWard(null);
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  // 🔹 Quản lý hiển thị nút
  useEffect(() => {
    const areas: string[] = [];
    if (districts.length > 0) areas.push("district");
    if (wards.length > 0) areas.push("ward");
    setShowArea(areas);
  }, [districts, wards]);

  // 🔹 Chuyển tab (City/District/Ward)
  const handleClickButton = (type: "city" | "district" | "ward") => {
    setCurrentTab(type);
    switch (type) {
      case "city":
        setOptionAddress(cities);
        break;
      case "district":
        setOptionAddress(districts);
        break;
      case "ward":
        setOptionAddress(wards);
        break;
    }
  };

  // 🔹 Chọn giá trị
  const handleOptions = (event: SyntheticEvent, newValue: IOption | null) => {
    if (!newValue) return;
    switch (currentTab) {
      case "city":
        setSelectedCity(newValue);
        break;
      case "district":
        setSelectedDistrict(newValue);
        break;
      case "ward":
        setSelectedWard(newValue);
        break;
    }
  };

  // 🔹 Tự chọn danh sách ban đầu là City
  useEffect(() => {
    setOptionAddress(cities);
  }, [cities]);
  const handleCompleteAddress = async () => {
    if (!validateForm(name, phone)) return; // Nếu lỗi thì không submit

    const address: Address = {
      name,
      phone: phone || "",
      email: user?.email,
      province: selectedCity!,
      district: selectedDistrict!,
      ward: selectedWard!,
      country: "Viet Namese",
      isDefault: addressUpdate.isDefault,
      note: "giao hang dung dia chi",
      postalCode: "09999",
      company: "THL",
    };

    try {
      if (showAddressForm.id) {
        // 🔹 UPDATE ADDRESS
        const dataUpdate: AddressType = { ...address, _id: String(showAddressForm.id) };
        const updated = await updateAddressService(dataUpdate);
        setAddressDefault(updated);
        setListAddress((prev) => {
          const index = prev.findIndex((a) => a._id === updated._id);
          if (index === -1) return prev;
          const newList = [...prev];
          newList[index] = updated;
          return newList;
        });
      } else {
        // 🔹 ADD NEW ADDRESS
        const newAddress = await addAddressesService(address);
        setAddressDefault(newAddress);
        setListAddress((prev) => [...prev, newAddress]);
      }
      handleClose();
    } catch (err) {
      console.error("❌ Lỗi khi lưu địa chỉ:", err);
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = (name: string, phone: string) => {
    const newErrors: Record<string, string> = {};

    if (name == null || name === "") newErrors.name = "Vui lòng nhập họ tên";
    if (!phone) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!selectedCity) newErrors.city = "Chọn tỉnh/thành phố";
    if (!selectedDistrict) newErrors.district = "Chọn quận/huyện";
    if (!selectedWard) newErrors.ward = "Chọn phường/xã";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    if (addressUpdate.name) {
      setName(addressUpdate.name);
      setPhone(addressUpdate.phone);
      setSelectedCity(addressUpdate.province);
      setSelectedDistrict(addressUpdate.district);
      if (addressUpdate.ward) setSelectedWard(addressUpdate.ward);
    } else {
      setName("");
      setPhone("");
    }
  }, [addressUpdate]);

  console.log("addressUpdate", addressUpdate, selectedCity, selectedDistrict);
  return (
    <>
      <Typography variant="h6">Địa chỉ mới (dùng thông tin trước sáp nhập)</Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Họ và tên"
        />
        <TextField
          name="phone"
          value={phone}
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setPhone(e.target.value)
          }
          placeholder="Số điện thoại"
          required
        />

        <Autocomplete
          disablePortal
          options={optionAddress}
          value={
            currentTab === "city"
              ? selectedCity
              : currentTab === "district"
                ? selectedDistrict
                : selectedWard
          }
          onChange={handleOptions}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <CustomTextFieldAddress
              params={params}
              handleClickButton={handleClickButton}
              showArea={showArea}
              currentTab={currentTab}
            />
          )}
        />
      </Box>

      <Box mt={4}>
        <Typography>
          <strong>Địa chỉ hiện tại:</strong>{" "}
          {[selectedCity?.label, selectedDistrict?.label, selectedWard?.label]
            .filter(Boolean)
            .join(" - ")}
        </Typography>
      </Box>
      <Box>
        {errors &&
          Object.entries(errors).map((err: [string, string], index) => {
            return (
              <Typography key={index} variant="h6" color="error">
                {err}
              </Typography>
            );
          })}
      </Box>
      <Box mt={2} sx={{ float: "right" }}>
        <Button variant="outlined" size="small">
          Back
        </Button>
        <Button
          onClick={handleCompleteAddress}
          sx={{ ml: 2 }}
          variant="contained"
          size="small"
          color="error"
        >
          Complete
        </Button>
      </Box>
    </>
  );
};

export default AddressForm;
