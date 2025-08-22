"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { handleSubscription } from "@/lib/api/strapi";
import { useState } from "react";
import validationSchema from "@/lib/schemas/subscription.schema";

export default function SubscribeForm() {
  // Translation
  const t = useTranslations();

  // State
  const [feedback, setFeedback] = useState("");

  // Functions
  const handleSubmit = async (
    values: { email: string },
    { setSubmitting, resetForm }: FormikHelpers<{ email: string }>
  ) => {
    try {
      const res = await handleSubscription(values.email);

      if (res.data?.documentId) {
        setFeedback(t("successfully-subscribed"));
      } else {
        setFeedback(t("this-email-is-already-subscribed"));
      }

      resetForm();
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex relative gap-2 items-center">
            <div className="relative">
              <Field
                as={Input}
                type="email"
                name="email"
                placeholder={t("email")}
                className="bg-white relative py-6 rtl:text-left text-black placeholder:text-gray-500 border-none rounded-sm px-3  w-48 text-sm focus:ring-2 focus:ring-amber-300"
              />
              {/* Error message from form */}
              <ErrorMessage
                name="email"
                component="div"
                className="absolute -bottom-5 left-0 text-xs text-red-700"
              />
            </div>

            {/* feedback message from request */}
            {feedback && (
              <div
                className={`text-xs absolute -bottom-5 ${
                  feedback === t("successfully-subscribed")
                    ? "text-green-600 right-0"
                    : "text-red-700 left-0"
                } text-left rtl:text-right `}
              >
                {feedback}
              </div>
            )}

            {/* Subscription button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-main-color hover:bg-main-color absolute right-1 transform dark:text-black text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors duration-200"
            >
              {isSubmitting ? t("subscribing") : t("subscribe")}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
