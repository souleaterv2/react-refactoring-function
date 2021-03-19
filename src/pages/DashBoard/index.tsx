import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

export const DashBoard: React.FC = () => {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFood, setEditinFood] = useState<FoodData>({} as FoodData);

  useEffect(() => {
    async function getFoods() {
      const response = (await api.get<FoodData[]>("/foods")).data;
      setFoods(response);
    }
    getFoods();
  },[]);

  const handleAddFood = async (food: FoodData) => {
    try {
      const response = (
        await api.post<FoodData>("/foods", {
          ...food,
          available: true,
        } as FoodData)
      ).data;

      setFoods([...foods, response]);
    } catch (err) {
      console.warn(err.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEditFood = (food: FoodData) => {
    setEditinFood(food);
    setIsEditModalOpen(true);
  };

  const handleUpdateFood = async (food: FoodData) => {
    try {
      const foodUpdate = (
        await api.put<FoodData>(`/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
        })
      ).data;

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdate.id ? f : foodUpdate
      );

      setFoods(foodsUpdated);

    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
