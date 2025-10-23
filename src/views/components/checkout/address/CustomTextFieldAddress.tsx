import { AutocompleteRenderInputParams, Box, Button, TextField } from "@mui/material";

type TPropCustomFieldAddress = {
  params: AutocompleteRenderInputParams;
  handleClickButton: (type: "city" | "district" | "ward") => void;
  showArea: string[];
  currentTab: "city" | "district" | "ward";
};

const CustomTextFieldAddress = ({
  params,
  handleClickButton,
  showArea,
  currentTab,
}: TPropCustomFieldAddress) => {
  return (
    <Box>
      <TextField {...params} label="Tìm kiếm địa chỉ" fullWidth />
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          variant={currentTab === "city" ? "contained" : "outlined"}
          onClick={() => handleClickButton("city")}
        >
          City
        </Button>
        <Button
          disabled={!showArea.includes("district")}
          variant={currentTab === "district" ? "contained" : "outlined"}
          onClick={() => handleClickButton("district")}
        >
          District
        </Button>
        <Button
          disabled={!showArea.includes("ward")}
          variant={currentTab === "ward" ? "contained" : "outlined"}
          onClick={() => handleClickButton("ward")}
        >
          Ward
        </Button>
      </Box>
    </Box>
  );
};

export default CustomTextFieldAddress;
