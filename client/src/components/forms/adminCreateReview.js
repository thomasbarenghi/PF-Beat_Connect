import {
  FormColumn,
  FormContainer,
  FormRow,
  Input,
  SwitchForm,
  TextArea,
  Head,
} from "@/components";

import {
  handleInputChange,
  handleSubmit,
  validateForm,
} from "@/data/formLogic";

import { forwardRef, useImperativeHandle } from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminEditReview, adminPostReview } from "@/redux/slices/admin/reviews";
import { adminGetBeats } from "@/redux/slices/admin/beats";
import { adminGetUsers } from "@/redux/slices/admin/users";
import { useRouter } from "next/router";
import { Autocomplete, TextField } from "@mui/material";

const AdminCreateReviewForm = forwardRef((props, ref) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const validateMode = "review";
  const [fieldsToValidate, setFieldsToValidate] = useState([]);
  const [error, setErrors] = useState({});
  const defaultValues =
    useSelector((state) => state.admin.reviews.currentEditingReview) || {};
  const mode = props.mode;
  const defaultUsers = useSelector((state) => state.admin.users.users);
  const defaultBeats = useSelector((state) => state.admin.beats.beats);
  const [softD, setSoftD] = useState(defaultValues.softDelete);

  console.log("defaultValues", defaultValues);
  console.log("DEFAULT BEATS", defaultBeats);

  const [form, setForm] = useState({
    createdBy: `${mode === "edit" ? defaultValues.createdBy._id : ""}`,
    rating: `${mode === "edit" ? defaultValues.rating : ""}`,
    beat: `${mode === "edit" ? defaultValues.beat._id : ""}`,
    comment: `${mode === "edit" ? defaultValues.comment : ""}`,
    title: `${mode === "edit" ? defaultValues.title : ""}`,
    id: `${mode === "edit" ? defaultValues._id : ""}`,
    // softDelete: `${mode === "edit" ? defaultValues.softDelete : ""}`,
  });

  console.log("data para el form", form);

  const options = defaultUsers.map((user) => ({
    label: user.username,
    value: user._id,
  }));

  const optionsBeats = defaultBeats.map((beat) => ({
    label: beat.name,
    value: beat._id,
  }));

  const handleInput = (e) => {
    handleInputChange(
      e,
      fieldsToValidate,
      setFieldsToValidate,
      form,
      setForm,
      validateMode
    );
  };

  const onSubmit = async (e) => {
    console.log("onSubmit", e, validateMode);
    const actionToDispatch =
      mode === "edit" ? adminEditReview : adminPostReview;
    try {
      await handleSubmit({
        form: form,
        actionToDispatch: actionToDispatch,
        dispatch: dispatch,
        setErrors: setErrors,
        validateMode: validateMode,
        formRef: formRef.current,
      });
      router.push("/admin/reviews");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setErrors(validateForm(form, fieldsToValidate, validateMode));
  }, [form, fieldsToValidate]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      // formRef.current.submit();
      onSubmit();
    },
  }));

  useEffect(() => {
    dispatch(adminGetUsers());
  }, []);

  useEffect(() => {
    dispatch(adminGetBeats());
  }, []);

  useEffect(() => {
    if (softD) {
      setSoftD(false);
    } else {
      setSoftD(true);
    }
  }, [form.softDelete]);

  const arraySoftDelete = {
    name: "softDelete",
    label: "Soft Delete",
    arrayButtons: [
      {
        text: "Yes",
        //segun is seller, dinamicamente se pone el active
        active: softD,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: "true",
          });
        },
      },
      {
        text: "No",
        active: !softD,
        handleAction: () => {
          setForm({
            ...form,
            softDelete: "false",
          });
        },
      },
    ],
  };

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <FormContainer>
        <FormRow>
          <FormColumn className="w-full">
            {mode === "create" && (
              <label
                htmlFor="createdBy"
                className="text-sm-medium flex min-w-0 flex-col gap-1"
              >
                {" "}
                Usuario creador
                <Autocomplete
                  id="createdBy"
                  name="createdBy"
                  options={options}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                    handleInput({
                      target: {
                        name: "createdBy",
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      className="border-radius-estilo2 bg-white px-4 py-2 text-sm placeholder:text-sm dark:bg-customDark-700 dark:text-black"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </label>
            )}
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Titulo"
              label="Titulo"
              onChange={handleInput}
              error={error.title}
              defaultValue={mode === "edit" ? defaultValues.title : ""}
            />
            <Input
              id="rating"
              type="number"
              name="rating"
              step="0.1"
              placeholder="Rating"
              label="Rating"
              onChange={handleInput}
              error={error.rating}
              defaultValue={mode === "edit" ? defaultValues.rating : ""}
            />
            { mode === "edit" && <SwitchForm
              label="Banear"
              name="softDelete"
              nameInput="softDelete"
              // defaultValue={mode === "edit" ? defaultValues.softDelete : ""}
              onChange={handleInput}
              arrayButtons={arraySoftDelete.arrayButtons}
              error={error.softDelete}
            />}
          </FormColumn>
          <FormColumn className="w-full">
            {mode === "create" && (
              <label
                htmlFor="beat"
                className="text-sm-medium flex min-w-0 flex-col gap-1"
              >
                {" "}
                Beat
                <Autocomplete
                  id="beat"
                  name="beat"
                  options={optionsBeats}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, newValue) => {
                    handleInput({
                      target: {
                        name: "beat",
                        value: newValue ? newValue.value : "",
                      },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      className="border-radius-estilo2 bg-white px-4 py-2 text-sm placeholder:text-sm dark:bg-customDark-700 dark:text-black"
                      variant="outlined"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </label>
            )}
            <TextArea
              id="comment"
              name="comment"
              placeholder="Comentario"
              label="Comentario"
              error={error.comment}
              onChange={handleInput}
              defaultValue={mode === "edit" ? defaultValues.comment : ""}
              className="h-20"
            />
          </FormColumn>
        </FormRow>
      </FormContainer>
    </form>
  );
});

export default AdminCreateReviewForm;
