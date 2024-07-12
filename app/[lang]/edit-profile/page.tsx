"use client"
import { Button } from "@nextui-org/react";
import PersonalItroduction from "@/components/edit-profile/PersonalItroduction";

export default async function EditProfile({
    params: { lang },
  }: {
    params: { lang: string };
  }) {
    return <>
        <div className="grid grid-cols-6">
          <Button
          color="primary"
          className="hidden md:block text-xl col-start-6 col-end-6"
          >
            Save
          </Button>
        </div>
        <PersonalItroduction />
    </>
  }