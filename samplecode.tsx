// "use client";
// import React, { useState, useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import Select from "react-select";
// import { gridStore } from "@/store";
// import { Button } from "@/components/ui/button";
// import { hayatEPI_user, selfEPI_user } from "@/services/episelfuser";
// import { useForm } from "react-hook-form";
// import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import axios from "axios";
// import { BaseUrl, liveUrl } from "@/const";
// import { getUserInfo } from "@/lib/gettoken";
// import { addUserMappingSchema } from "@/app/validations/usermapping";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Link from "next/link";

// const customStyles = {
//   control: (provided: any) => ({
//     ...provided,
//     minHeight: "30px",
//     margin: "0",
//   }),
//   dropdownIndicator: (provided: any) => ({
//     ...provided,
//     padding: "4px",
//   }),
//   menu: (provided: any) => ({
//     ...provided,
//     marginTop: "0",
//   }),
//   option: (provided: any) => ({
//     ...provided,
//     padding: "2px 12px",
//     fontSize: "13px",
//   }),
// };
// type userType = {
//   value: string;
//   label: string;
// };

// type SubmitType = {
//   hayat_uid?: string;
//   epimis_hrcode?: string;
//   is_active?: string;
//   created_by?: string;
// };
// // };
// export default function page() {
//   const { openOn } = gridStore((state) => state);
//   const [selfUserState, setselfUser] = useState();
//   const [hayatUser, sethayatUser] = useState();
//   const [selectedselfUser, setSelectedUser] = useState<userType | null>(null);
//   const [selectedhayatUser, setSelectedhayatUser] = useState<userType | null>(
//     null
//   );
//   type ValidationSchemaType = z.infer<typeof addUserMappingSchema>;
//   const [usersMappingList, setUsersMappingList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   // const [totalPages, setTotalPages] = useState(5);
//   const [loading, setLoading] = useState(false);
//   const [erro, setStateError] = useState("");
//   const [TotalCount, setTotalCount] = useState();
//   const pageGroupSize = 3;
//   const recordsPerPage = 8;
//   const totalPages = Math.ceil((TotalCount??64) / recordsPerPage);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors, isSubmitting },
//     setError,
//     clearErrors,
//     control,
//     reset,
//     watch,
//   } = useForm<ValidationSchemaType>({
//     resolver: zodResolver(addUserMappingSchema),
//     mode: "onChange",
//   });

//   var created_by = getUserInfo().created_by_;

//   useEffect(() => {
//     const fetchSelfUser = async () => {
//       try {
//         const epi_self_user = await selfEPI_user();
//         const epi_hayat_user = await hayatEPI_user();
//         const selfUser = epi_self_user?.map(
//           (selfuser: { hrCode: string; firstName: string }) => {
//             return {
//               value: selfuser.hrCode,
//               label: selfuser.firstName + " ---------- " + selfuser.hrCode,
//             };
//           }
//         );

//         const hayatUser = epi_hayat_user?.map(
//           (hayatuser: { uid: string; username: string }) => ({
//             value: hayatuser.uid,
//             label: hayatuser.username,
//           })
//         );

//         setselfUser(selfUser);
//         sethayatUser(hayatUser);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchSelfUser();
//   }, []);

//   const handleSelfUser = (option: userType | null | any) => {
//     if (option) {
//       setSelectedUser(option);
//       setValue("epimis_hrcode", option.value, { shouldValidate: true });
//     }
//   };
//   const handleHayatUser = (option: userType | null | any) => {
//     if (option) {
//       setSelectedhayatUser(option);
//       setValue("hayat_uid", option.value, { shouldValidate: true });
//     }
//   };

//   const onSubmit = async (formData: any) => {
//     const add_map_Data = {
//       hayat_uid: formData.hayat_uid,
//       epimis_hrcode: formData.epimis_hrcode,
//       is_active: "true",
//       created_by: created_by,
//     };

//     try {
//       const response = await axios.post(
//         `${BaseUrl}/EPIUser/add_map_user`,
//         add_map_Data
//       );

//       if (response.data.success) {
//         toast.success("Success: " + response.data.message);
//       }
//       if (!response.data.success) {
//         toast.error("Error: " + response.data.error);
//       }

//       reset();
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   useEffect(() => {
//     fetchUsers(currentPage, totalPages);
//   }, [currentPage, totalPages]);
//   const fetchUsers = async (page: any, pageSize: any) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${liveUrl}/EPIUser/get_all_user_mapping?page=${currentPage}&page_limit=${totalPages}`
//       );
//       setUsersMappingList(response.data.result);

//       setTotalCount(response?.data?.count ?? response.data.count);
//     } catch (error) {
//       setStateError("Error fetching users");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePageChange = (page: any) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };
//   const renderPageNumbers = () => {
//     const pages = [];
//     const startPage =
//       Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
//     const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <li key={i}>
//           <button
//             className={`flex items-center justify-center px-3 h-8 leading-tight ${
//               currentPage === i
//                 ? "text-blue-600 bg-blue-50 border-blue-600"
//                 : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
//             } border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
//             onClick={() => handlePageChange(i)}
//             disabled={currentPage === i}
//           >
//             {i}
//           </button>
//         </li>
//       );
//     }
//     return pages;
//   };

//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className={` mx-2 md:mx-20  mt-20 mb-10 ${
//           openOn
//             ? " flex  flex-wrap justify-center items-center lg:ml-72 space-x-32   "
//             : "flex  flex-wrap justify-center items-center lg:ml-72 space-x-32 "
//         }`}
//       >
//         <div className="md:w-[400px]">
//           <Label
//             className="text-[#8646B4]
// "
//           >
//             EPI Add Hayat User
//           </Label>
//           <Select
//             placeholder="self user..."
//             value={selectedhayatUser}
//             onChange={handleHayatUser}
//             options={hayatUser}
//             styles={customStyles}
//             isSearchable
//           />
//           <Input
//             type="hidden"
//             defaultValue=""
//             {...register("hayat_uid", {
//               required: "hayat_uid ID required",
//             })}
//             required
//           />
//           <div>
//             {errors.hayat_uid && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.hayat_uid.message}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="md:w-[400px]">
//           <Label
//             className="text-[#8646B4]
// "
//           >
//             EPI Self User
//           </Label>
//           <Select
//             placeholder="self user..."
//             value={selectedselfUser}
//             onChange={handleSelfUser}
//             options={selfUserState}
//             styles={customStyles}
//             isSearchable
//           />
//           <Input
//             type="hidden"
//             {...register("epimis_hrcode", {
//               required: "epimis_hrcode ID required",
//             })}
//           />
//           <div>
//             {errors.epimis_hrcode && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.epimis_hrcode.message}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="mt-6 w-[300px] ml-10   ">
//           <Button
//             disabled={isSubmitting}
//             type="submit"
//             className=" md:w-[350px]  -ml-28  hover:bg-[#86469C]/80 bg-[#86469C]"
//           >
//             {isSubmitting ? (
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             ) : (
//               "Submit"
//             )}
//           </Button>
//         </div>
//       </form>
//       {usersMappingList.length > 0 ? (
//         <div
//           className={`  mx-auto flex-col ${
//             openOn ? "flex w-8/12 lg:ml-80  " : "w-10/12"
//           }`}
//         >
//           <Card x-chunk="dashboard-06-chunk-0">
//             <CardContent className="bg-[#F1F5F9]">
//               <Table>
//                 <TableHeader className="bg-slate-400/30">
//                   <TableRow className="">
//                     <TableHead className="text-[13px] mr-20 ">Name</TableHead>
//                     <TableHead className="text-[13px]">
//                       {" "}
//                       Hayat User Name
//                     </TableHead>
//                     <TableHead className="text-[13px]">
//                       {" "}
//                       EPI User Name
//                     </TableHead>
//                     <TableHead className="text-[13px]">EPI Hr Code</TableHead>
//                     <TableHead className="text-[13px]">Facility Id</TableHead>
//                     <TableHead className="text-[13px]">User Role</TableHead>

//                     <TableHead>Status</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {usersMappingList.length > 0 &&
//                     usersMappingList.map((user: any) => (
//                       <TableRow key={user?.uid}>
//                         <TableCell className="text-[12px] py-4">
//                           {user.un_Name}
//                         </TableCell>

//                         <TableCell className="text-[12px]">
//                           {user.hayat_UserName}
//                         </TableCell>
//                         <TableCell className="text-[12px]">
//                           {user.epimis_UserName}
//                         </TableCell>
//                         <TableCell className="text-[12px]">
//                           {user.epimis_Hrcode}
//                         </TableCell>
//                         <TableCell className="text-[12px]">
//                           {user.facilityId}
//                         </TableCell>
//                         <TableCell className="text-[12px]">
//                           {user.user_Role}
//                         </TableCell>

//                         <TableCell>
//                           <Badge variant="outline" className="bg-slate-200  ">
//                             {user.isActive ?? "user.isActive"
//                               ? "Active"
//                               : "Inactive"}
//                           </Badge>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   {usersMappingList.length > 0 && (
//                     <div className="mt-5">
//                       <nav aria-label="Page navigation example">
//                         <ul className="inline-flex -space-x-px text-sm">
//                           <li>
//                             <button
//                               className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
//                                 currentPage === 1
//                                   ? "opacity-50 cursor-not-allowed"
//                                   : ""
//                               }`}
//                               disabled={currentPage === 1}
//                               onClick={() =>
//                                 currentPage > 1 &&
//                                 handlePageChange(currentPage - 1)
//                               }
//                             >
//                               Previous
//                             </button>
//                           </li>

//                           {/* Page Numbers */}
//                           {renderPageNumbers()}

//                           {/* Next Button */}
//                           <li>
//                             <Link
//                               href=""
//                               className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
//                                 usersMappingList.length < totalPages ||
//                                 usersMappingList.length === TotalCount
//                                   ? "opacity-50 cursor-not-allowed bg-red-900"
//                                   : ""
//                               }`}
//                               onClick={() =>
//                                 usersMappingList.length === totalPages &&
//                                 handlePageChange(currentPage + 1)
//                               }
//                             >
//                               Next
//                             </Link>
//                           </li>
//                         </ul>
//                       </nav>
//                     </div>
//                   )}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center h-full">
//           <Loader2 className="h-14 w-14 animate-spin" color="#86469C" />
//         </div>
//       )}
//     </div>
//   );
// }