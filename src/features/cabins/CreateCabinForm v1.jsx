import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  //register input into the form
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState; //

  const queryClient = useQueryClient();
  // inserting data into the database
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(); // reset the form after successful submission
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // handle form submission
  // handle form submission
  const onSubmit = (data) => {
    // passing the image
    mutate({ data, image: data.image[0] });
  };

  // const onSubmit = (formData) => {
  //   const data = {
  //     name: formData.name,
  //     maxCapacity: parseInt(formData.maxCapacity),
  //     regularPrice: parseFloat(formData.regularPrice),
  //     discount: parseFloat(formData.discount),
  //     description: formData.description,
  //   };
  //   mutate({ data, image: formData.image[0] });
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="maxCapacity"
          {...register("maxCapacity", {
            // handling errors
            required: "This field is required",
            min: {
              value: 1,
              message: "Maximum capacity must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isCreating}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            // function that handle discount should not greater than regular price
            // value= current value of the input
            validate: (value) =>
              parseFloat(value) <= parseFloat(getValues().regularPrice) ||
              "Discount should be less than regular price",
            min: {
              value: 0,
              message: "Discount cannot be negative",
            },
          })}
        />
      </FormRow>

      {/* label is a prop that we pass to the FormRow component */}
      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          disabled={isCreating}
          accept="image/*"
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
