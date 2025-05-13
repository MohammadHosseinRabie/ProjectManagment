import getProjects from "@/hooks/use-get-projects-list";
import { Box, Button, Spinner, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const ProjectsList = () => {
  const { data, isLoading, isError } = getProjects();
  const pathname = usePathname();
  if (isLoading) {
    return (
      <Box>
        <Spinner size={"md"} />
        در حال بارگذاری...
      </Box>
    );
  }
  if (isError) {
    return <Box>خطا در بارگذاری داده‌ها!</Box>;
  }

  return (
    <Stack w={"full"}>
      {data?.map((project) => {
        const isActive = pathname.startsWith(`/projects/${project.id}/`);
        return (
          <Button
          asChild
          size={"2xl"}
          w={"full"}
          colorPalette={"cyan"}
          rounded={"full"}
          key={project.id}
          variant={isActive ? 'subtle' : 'outline'}
        >
          <Link href={`/projects/${project.id}/tasks`}>{project.name}</Link>
        </Button>
        )
      }
        
      )}
    </Stack>
  );
};
