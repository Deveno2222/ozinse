import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

interface MovieBreadCrumbProps {
  page: string;
}

const MovieBreadCrumb = ({ page }: MovieBreadCrumbProps) => {
  return (
    <Breadcrumb className="py-10 pl-12">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link className="hover:underline" to={"/project"}>Проекты</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-dark font-bold">
            {page}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MovieBreadCrumb;
