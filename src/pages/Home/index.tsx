import { useEffect, useMemo, useState } from "react";
import { CardContact } from "../../components/Card";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import APICall from "../../config/axios";
import { setContacts, setLoading } from "../../store/slices/contact";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { contacts, loading } = useAppSelector((state) => state.contactReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    dispatch(setLoading(true));
    try {
      const response = await APICall.get("");
      if (response.status === 200) {
        dispatch(setContacts(response?.data?.data));
      }
    } catch (error: any) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const contactMemo = useMemo(() => {
    return contacts?.filter((item) =>
      `${item?.firstName} ${item?.lastName}`
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    );
  }, [contacts, searchValue]);

  return (
    <Layout>
      <div className="flex gap-8 w-full mt-8 px-4 md:px-8">
        <input
          name="search"
          placeholder="Search contact..."
          className="flex flex-1"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e?.currentTarget?.value);
          }}
        />
        <Link to={"/contact"}>
          <Button className="text-md">Add Contact</Button>
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center mt-8">
          <div className="loader" />
        </div>
      ) : (
        <div className="px-4 pb-8 grid grid-cols-12 gap-6 pt-8">
          {contactMemo?.map((item) => {
            return (
              <div className="col-span-12 md:col-span-6" key={item?.id}>
                <CardContact item={item} />
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Home;
