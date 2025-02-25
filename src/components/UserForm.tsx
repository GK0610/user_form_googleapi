import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../components/UserForm.css"; 

interface FormData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  pincode: string;
}

const UserForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const pincodeValue = useWatch({ control, name: "pincode" });

  const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loadGoogleScript = () => {
      if (!googleApiKey) {
        console.error("Google API Key is missing!");
        return;
      }

      const existingScript = document.querySelector("script[src*='maps.googleapis.com']");
      if (existingScript) return;

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.async = true;
      script.onload = () => initializeAutocomplete();
      document.body.appendChild(script);
    };

    const initializeAutocomplete = () => {
      const input = document.getElementById("address") as HTMLInputElement;
      if (!input) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setValue("address", place.formatted_address || "");

        // Extract Pincode
        const pincodeComponent = place.address_components?.find(comp =>
          comp.types.includes("postal_code")
        );
        if (pincodeComponent) {
          setValue("pincode", pincodeComponent.long_name);
        }
      });
    };

    loadGoogleScript();
  }, [setValue, googleApiKey]);

  const onSubmit = (data: FormData) => {
    alert(`User Details Submitted:\n\n${JSON.stringify(data, null, 2)}`);
    reset(); // Clears the form for a new entry when submiting
  };

  return (
    <div className="form-container">
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        
        <TextField
          label="Username"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        
        <TextField
          label="First Name"
          fullWidth
          {...register("firstname", { required: "First Name is required" })}
          error={!!errors.firstname}
          helperText={errors.firstname?.message}
        />

        
        <TextField
          label="Last Name"
          fullWidth
          {...register("lastname", { required: "Last Name is required" })}
          error={!!errors.lastname}
          helperText={errors.lastname?.message}
        />

        
        <TextField
          label="Email"
          type="email"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        
        <TextField
          label="Phone"
          type="tel"
          fullWidth
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Phone number must be 10 digits",
            },
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register("dob", {
            required: "Date of Birth is required",
            validate: value => {
              const birthDate = new Date(value);
              const today = new Date();
              const age = today.getFullYear() - birthDate.getFullYear();
              return age >= 18 || "User must be at least 18 years old";
            },
          })}
          error={!!errors.dob}
          helperText={errors.dob?.message}
        />

        
        <TextField
          id="address"
          label="Address"
          fullWidth
          {...register("address", { required: "Address is required" })}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        
        <TextField
          label="Pincode"
          fullWidth
          value={pincodeValue || ""}
          {...register("pincode", { required: "Pincode is required" })}
          error={!!errors.pincode}
          helperText={errors.pincode?.message}
        />

       
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>

      </form>
    </div>
  );
};

export default UserForm;
