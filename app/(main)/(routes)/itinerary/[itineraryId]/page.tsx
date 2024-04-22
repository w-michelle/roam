import getCurrentUser from "@/app/actions/getCurrentUser";
import getItinerary from "@/app/actions/getItinerary";
import EmptyState from "@/app/components/EmptyState";
import ItineraryContent from "@/app/components/itinerary/ItineraryContent";

interface IParams {
  itineraryId: string;
}

const ItineraryPage = async ({ params }: { params: IParams }) => {
  const currentItinerary = await getItinerary(params.itineraryId);
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentItinerary) {
    return <EmptyState title="Error: Itinerary does not exist" />;
  }

  return (
    <ItineraryContent
      currentItinerary={currentItinerary}
      currentUser={currentUser}
    />
  );
};

export default ItineraryPage;
