"use client";

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
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

const formSchema = z.object({
   name: z
      .string()
      .trim()
      .min(1, { message: "O nome do produto é obrigatório." }),
   price: z.number().min(0.01, {
      message: "O preço do produto deve ser maior que 0.",
   }),
   stock: z.coerce
      .number()
      .positive({ message: "A quantidade em estoque deve ser positiva." })
      .int()
      .min(0, {
         message: "O estoque é obrigatório.",
      }),
});

const AddProductButton = () => {
   const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         price: 0,
         stock: 1,
      },
      shouldUnregister: true,
   });

   const onSubmit = (data: z.infer<typeof formSchema>) => {
      console.log(data);
   };

   return (
      <Dialog>
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
                     <Button type="submit">Salvar</Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default AddProductButton;
