"use client";

import useEditModal from "@/app/hooks/useEditModal";
import { SafeCategory, SafeListing } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import * as yup from "yup";
import CategoryContent from "../CategoryContent";
import Input from "../inputs/Input";
import ImagePreview from "../inputs/ImagePreview";
import ListingContent from "../inputs/ListingContent";
import Image from "next/image";
interface EditModalProp {
  listing: SafeListing;
  categories?: SafeCategory[];
}
enum STEPS {
  CATEGORY = 0,
  DESCRIPTION = 1,
  IMAGES = 2,
}
type FormData = {
  categoryId?: string;

  title: string;
  description?: string;
  images?: any;
};

const EditModal: React.FC<EditModalProp> = ({ listing, categories }) => {
  const editModal = useEditModal();

  const router = useRouter();

  const [existingImgs, setExistingImgs] = useState<any>([]);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [images, setImages] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newUpload, setNewUpload] = useState(false);

  useEffect(() => {
    setValue("title", listing.title);
    setValue("description", listing.description || "");
    setValue("categoryId", listing.category);
    const imagesUrls = listing.images.map((img) => img.url);
    setExistingImgs(imagesUrls);
  }, [listing]);

  const schema = yup.object().shape({
    categoryId: yup.string(),
    title: yup.string().required("Title is required"),
    description: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const selectedId = watch("categoryId");
  const selectedImages = watch("images");

  const handleChange = (e: any) => {
    setImages([...e.target.files]);
    setCustomValue("images", [...e.target.files]);
  };

  const removePreviewImage = (imgname: string) => {
    const newList = images.filter((item: any) => item.name !== imgname);
    setImages(newList);

    setCustomValue("images", newList);
  };

  const setCustomValue = (id: any, value: any) => {
    setValue(id, value);
  };

  const nextStep = () => {
    setStep((value) => value + 1);
  };

  const backStep = () => {
    setStep((value) => value - 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (formValues) => {
    setIsLoading(true);

    const data = new FormData();
    if (newUpload) {
      formValues.images.forEach((file: any) => {
        data.append("images", file);
      });
    }

    data.append("categoryId", formValues.categoryId);
    data.append("title", formValues.title);
    data.append("description", formValues.description);
    data.append("isUpdate", newUpload ? "newImg" : "");
    data.append("listingId", listing.id);

    axios
      .post("/api/editListing", data)
      .then((result) => {
        toast.success("Item Updated!");

        reset();
        setStep(STEPS.CATEGORY);
        setImages("");
        setNewUpload(false);
        editModal.onClose();

        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let bodyContent = (
    <div>
      <CategoryContent
        onClick={(catId) => setCustomValue("categoryId", catId)}
        selected={selectedId}
        categories={categories}
      />
    </div>
  );
  let headerContent = (
    <div className="text-lg font-semibold">Choose a category</div>
  );
  if (step === STEPS.DESCRIPTION) {
    headerContent = <div className="text-lg font-semibold">Details</div>;
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Input register={register} errors={errors} id="title" label="Title" />
        <Input
          register={register}
          errors={errors}
          id="description"
          label="Description"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    headerContent = <div className="text-lg font-semibold">Add Images</div>;
    bodyContent = (
      <div className="">
        {!newUpload && (
          <div className="flex flex-col items-center justify-center ">
            <button
              onClick={() => setNewUpload(true)}
              className="py-2 mb-6 w-[200px] border-2 border-black text-black hover:bg-black hover:text-white rounded-md"
            >
              Upload New
            </button>
            {existingImgs.map((img: string, index: any) => (
              <div
                key={index}
                className="relative w-[200px] h-[120px] border-[1px] rounded-lg"
              >
                <Image src={img} alt="Listing Image" fill />
              </div>
            ))}
          </div>
        )}
        {images?.length > 0 && newUpload && (
          <div>
            <p className="text-neutral-600 text-center mb-4">Preview</p>
            <div className="p-3 grid grid-cols-4 gap-4  max-h-[450px] overflow-y-auto">
              {images?.map((file: any, index: any) => (
                <ImagePreview
                  image={file}
                  key={index}
                  onClick={(name: string) => removePreviewImage(name)}
                />
              ))}
            </div>
          </div>
        )}
        {images?.length === 0 && newUpload && (
          <label
            htmlFor="images"
            className=" cursor-pointer border-dashed border-2 border-neutral-300 p-20 flex flex-col justify-center items-center"
          >
            <p>Upload Image</p>
            <input
              type="file"
              {...register("images")}
              id="images"
              name="images"
              accept="image/png, image/jpeg, image.jpg"
              className="hidden"
              multiple
              onChange={handleChange}
            />
          </label>
        )}
      </div>
    );
  }
  if (!editModal.isOpen) {
    return null;
  }
  return (
    <div className="flex items-center justify-center fixed inset-0 bg-neutral-800/70 z-10">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto">
        <div>
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={editModal.onClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              {headerContent}
            </div>
            {/* body */}
            <div className="p-7">
              <ListingContent bodyContent={bodyContent} />
            </div>
            {/* buttons */}
            <div className="p-9 flex items-center justify-between gap-10">
              {step !== STEPS.CATEGORY && (
                <button
                  onClick={backStep}
                  className="py-3 w-full bg-cusGreen hover:bg-cusGreen/80 disabled:bg-cusGreen/30 text-white rounded-md"
                  disabled={isLoading}
                >
                  BACK
                </button>
              )}
              {step === STEPS.IMAGES ? (
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="disabled:cursor-not-allowed py-3 w-full hover:bg-cusGreen/80 bg-cusGreen disabled:bg-cusGreen/30 text-white rounded-md"
                  disabled={isLoading}
                >
                  SUBMIT
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="disabled:cursor-not-allowed py-3 w-full hover:bg-cusGreen/80 bg-cusGreen disabled:bg-cusGreen/30 text-white rounded-md"
                  disabled={isLoading}
                >
                  NEXT
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
