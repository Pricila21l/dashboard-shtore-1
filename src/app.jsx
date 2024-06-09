
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container,Table, Modal, ModalBody, ModalHeader,ModalFooter, FormGroup,Label,Input, Navbar, NavItem, NavLink} from 'reactstrap';
const data =[
{id: 1, nombre:"Pricila", apellido:"Lopez", telefono:"37040767",edad:"20", genero:"f", direccion:"caserio vista hermosa"},
{id: 2, nombre:"Juan", apellido:"Cardona", telefono:"59020240",edad:"22", genero:"m", direccion:"aldea san rafael"},
{id: 3, nombre:"Marta", apellido:"De Leon", telefono:"11562707",edad:"19", genero:"f", direccion:"aldea santa rosa"},
{id: 4, nombre:"Matias", apellido:"Sandobal", telefono:"3o112343",edad:"18", genero:"m", direccion:"aldea san jose "},
{id: 5, nombre:"Ana", apellido:"Carreeto", telefono:"75378214",edad:"17", genero:"f", direccion:"aldea las barrancas"},
]
class App extends React.Component {
  state={
    data:data,
    modalOpen:false,//modo no visible
    newElement:{//nuevo elemento con datos vacios
      id:"",
      nombre:"",
      apellido:"",
      telefono:"",
      edad:"",
      genero:"",
      direccion:"",

    }
  } 

toggleModal=()=>{
  this.setState({modalOpen :!this.state.modalOpen});
}  
handleChange=(e)=>{
  this.setState({
    newElement:{
      ...this.state.newElement,// copia las propiedades actuales
      [e.target.name]: e.target.value//actualiza las propiedades de nuevo elemento
    }
  })

}
addElement = ()=>{
  const newElement= this.state.newElement;
  newElement.id=this.state.data.length+1;
  const newData=[...this.state.data, newElement];
  this.setState({data: newData, modalOpen: false, newElement:{id:"",nombre:"",apellido:"",telefono:"",edad:"",genero:"",direccion:"",}})
}
deleteElement = (id)=>{// nos sirve para eliminar 
  const newData=this.state.data.filter(element=> element.id !==id)
  this.setState({data:newData})
  }
  
    editElement = (id)=>{
      const elementToedit =this.state.data.find(element=> element.id === id);
      this.setState({
        editingElementId: id,
        newElement:{...elementToedit}
      })
      this.toggleModal();
  }
  updateElement =()=>{
    const updateData = this.state.data.map(element=>{
      if(element.id===this.state.editingElementId){
        return this.state.newElement;
      }
      return element;
    })
    this.setState({data:updateData,modalOpen:false, editingElementId:null, newElement:{id:"",nombre:"",apellido:"",telefono:"",edad:"",genero:"",direccion:""}})
  }

  render(){
    return (
      <>
      <Navbar color='dark' dark expand= 'md'>
        <NavbarBrand href=''>Venta de Arreglos Florales Naturales y Eternas</NavbarBrand>
        <Nav className='mi caja'navbar>
          <NavItem> 
            <NavLink href='#'> Inicio </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='#'> Flores Naturales </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='#'> Flores Eternas </NavLink>
          </NavItem>
          <NavItem> 
          </Nav>
      </Navbar>
      <Container>
      <Button color='dark'onClick={this.toggleModal}>insertar un nuevo registro</Button>
      <br/><br/>
      <Table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Telefono</th>
            <th>Edad</th>
            <th>Genero</th>
            <th>Direccion</th>
            <th>acciones</th>

          </tr>
        </thead>
        <tbody>
         {this.state.data.map((elemento)=>(
          <tr>
            <td>{elemento.id}</td>
            <td>{elemento.nombre}</td>
            <td>{elemento.apellido}</td>
            <td>{elemento.telefono}</td>
            <td>{elemento.edad}</td>
            <td>{elemento.genero}</td>
            <td>{elemento.direccion}</td>
            <td>
              <Button color="primary" onClick={()=> this.editElement(elemento.id)}>editar</Button>{"    "}
              <Button color='danger'onClick={()=>this.deleteElement(elemento.id)}>eliminar</Button>
            </td>
          </tr>

         ))} 
        </tbody>
      </Table>
      </Container>
      <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}> 
        <ModalHeader>modal para agregar nuevo elemento </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for='nombre'>Nombre</Label>
            <Input type='text'name='nombre'id='nombre'value={this.state.newElement.nombre} onChange={this.handleChange} ></Input>
            <Label for='nombre'>apellido</Label>
            <Input type='text'name='apellido'id='apellido'value={this.state.newElement.apellido} onChange={this.handleChange}  ></Input>
            <Label for='nombre'>telefono</Label>
            <Input type='text'name='telefono'id='telefono'value={this.state.newElement.telefono} onChange={this.handleChange} ></Input>
            <Label for='nombre'>edad</Label>
            <Input type='text'name='edad'id='edad'value={this.state.newElement.edad} onChange={this.handleChange} ></Input>
            <Label for='nombre'>genero</Label>
            <Input type='text'name='genero'id='genero'value={this.state.newElement.genero} onChange={this.handleChange} ></Input>
            <Label for='nombre'>direccion</Label>
            <Input type='text'name='direccion'id='direccion'value={this.state.newElement.direccion} onChange={this.handleChange} ></Input>
            
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {this.state.editingElementId ?(
            <Button color='primaary' onClick={this.updateElement} >Actualizar</Button>
          ) :(
            <Button color='primary' onClick={this.addElement}> agregar</Button>
          )
          }
           <Button color='danger' onClick={this.toggleModal}> cancelar</Button>
        </ModalFooter>
        
      </Modal>
      </>
    );
  } 

}

export default App;
