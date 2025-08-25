"use client";
import React, { useState } from "react";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "@aws-amplify/ui-react";
import { useForm } from "react-hook-form";
import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const SettingForm = ({ initialData, onSubmit, userType }: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-start w-full pt-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {`${userType.charAt(0).toUpperCase() + userType.slice(1)} Settings`}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account preferences and personal information
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <CustomFormField name="name" label="Name" disabled={!editMode} />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              disabled={!editMode}
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              disabled={!editMode}
            />

            {/* Buttons */}
            <div className="pt-4 flex justify-end gap-4">
              <Button
                type="button"
                onClick={toggleEditMode}
                className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200"
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>
              {editMode && (
                <Button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary-700 text-white hover:bg-primary-800"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingForm;
