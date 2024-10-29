import Header, {
   HeaderLeft,
   HeaderSubTitle,
   HeaderTitle,
} from "./_components/header";

export default function Home() {
   return (
      <div className="w-full space-y-8 p-8">
         <Header>
            <HeaderLeft>
               <HeaderSubTitle>Dashboard</HeaderSubTitle>
               <HeaderTitle>Visão Geral dos dados</HeaderTitle>
            </HeaderLeft>
         </Header>
      </div>
   );
}
