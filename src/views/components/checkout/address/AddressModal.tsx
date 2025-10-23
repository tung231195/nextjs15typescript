import { AddressType } from "@/app/types";
import { Box, Button, Divider, Radio, Typography } from "@mui/material";
type PropAddressModal = {
  showAddressForm: () => void;
  listAddress: AddressType[];
  handleUpdateAddressForm: (_id: string) => void;
  hanldeDefault: (_id: string) => void;
  hanldeConfirmAddressModal: () => void;
};

const AddressModal = ({
  showAddressForm,
  listAddress,
  handleUpdateAddressForm,
  hanldeDefault,
  hanldeConfirmAddressModal,
}: PropAddressModal) => {
  return (
    <Box>
      <Typography>My Address</Typography>
      <Divider sx={{ p: 2 }} />

      <Divider />
      {listAddress.length > 0 &&
        listAddress.map((address: AddressType) => {
          return (
            <Box key={address._id} sx={{ display: "flex" }}>
              <Radio
                checked={address.isDefault ? true : false}
                onChange={() => hanldeDefault(address._id)}
              />
              <Box sx={{ padding: 2 }}>
                <Box>
                  <Typography variant="body1">{address.name}</Typography> |{" "}
                  <Typography variant="overline">(+84){address.phone}</Typography>
                </Box>
                <Box>
                  {address.province?.label}-{address.district?.label}-{address.ward?.label}
                </Box>
                <Button variant="outlined" size="small">
                  {address.isDefault ? "default" : "not default"}
                </Button>
              </Box>
              <Button size="small" onClick={() => handleUpdateAddressForm(address._id)}>
                update
              </Button>
            </Box>
          );
        })}

      <Divider />
      <Button onClick={showAddressForm} variant="outlined" size="medium" sx={{ mt: 3 }}>
        Add New Address
      </Button>
      <Divider sx={{ p: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button color="warning" variant="contained" size="medium" sx={{ mt: 3 }}>
          Cancel
        </Button>
        <Button
          onClick={hanldeConfirmAddressModal}
          color="error"
          variant="contained"
          size="medium"
          sx={{ mt: 3, ml: 2 }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default AddressModal;
