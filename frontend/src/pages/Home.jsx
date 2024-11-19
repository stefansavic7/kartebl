import Input from "../components/Input";

const Home = () => {
  return (
    <div>Home
    <Input fieldType="password"  ></Input>
    <Input fieldType='outlined-required' size='30rem'  ></Input>
    <Input fieldType='outlined-disabled'  ></Input>
    <Input fieldType='number'  ></Input>
    <Input fieldType='helperText'  ></Input>
    

    </div>
  )
}

export default Home