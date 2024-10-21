"use client";

import { createProduct } from "@/app/_actions/product/create-product";
import {
   createProductSchema,
   CreateProductSchemaType,
} from "@/app/_actions/product/create-product/schema";
import { Button } from "@/app/_components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const CreateProductButton = () => {
   const [dialogIsOpen, setDialogIsOpen] = useState(false);

   const form = useForm<CreateProductSchemaType>({
      shouldUnregister: true,
      resolver: zodResolver(createProductSchema),
      defaultValues: {
         name: "",
         price: 0,
         stock: 1,
      },
   });

   const onSubmit = async (data: CreateProductSchemaType) => {
      try {
         await createProduct(data);
         setDialogIsOpen(false);
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
         <DialogTrigger asChild>
            <Button className="gap-2">
               <PlusIcon size={20} />
               Novo produto
            </Button>
         </DialogTrigger>

         <DialogContent>
            <Form {...form}>
               <DialogHeader>
                  <DialogTitle>Criar produto</DialogTitle>
                  <DialogDescription>
                     Insira as informações abaixo
                  </DialogDescription>
               </DialogHeader>

               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nome</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Digite o nome do produto"
                                 {...field}
                              />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="price"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Preço</FormLabel>
                           <FormControl>
                              <NumericFormat
                                 thousandSeparator="."
                                 decimalSeparator=","
                                 fixedDecimalScale
                                 decimalScale={2}
                                 prefix="R$ "
                                 allowNegative={false}
                                 customInput={Input}
                                 onValueChange={(values) =>
                                    field.onChange(values.floatValue)
                                 }
                                 {...field}
                                 onChange={() => {}}
                              />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="stock"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Estoque</FormLabel>
                           <FormControl>
                              <Input
                                 type="number"
                                 placeholder="Digite o estoque do produto"
                                 {...field}
                              />
                           </FormControl>

                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <DialogFooter>
                     <DialogClose asChild>
                        <Button variant="secondary" type="reset">
                           Cancelar
                        </Button>
                     </DialogClose>

                     <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="gap-1.5"
                     >
                        {form.formState.isSubmitting && (
                           <Loader2Icon className="animate-spin" size={15} />
                        )}
                        Salvar
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default CreateProductButton;