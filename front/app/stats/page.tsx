import { redirectToLogin, getLoginSession } from '@/lib/auth';
import conn from '@/lib/db';
import { StatusBar } from '../buttons.component';


export default async function Stats(req: any){
  await redirectToLogin();
  let session;
  console.log("nice", req?.searchParams, "nice");
  let veg_id = req?.searchParams?.veg || null;
  let weight;
  let count;
  let userName;
  try {
    session = await getLoginSession();
    if (!session?.user?.email)
    throw new Error("No session");

    userName = session.user.name;

    let query;
    let values;

    if(veg_id){
      query = "SELECT SUM(h.weight) AS weight, SUM(h.amount) AS amount FROM users AS u JOIN veg AS v ON u.garden_id = v.garden_id " +
        "JOIN harvest AS h ON v.veg_id = h.veg_id WHERE u.email = crypt($1, email) AND v.veg_id = $2";
      values = [session.user.email, veg_id];
    }
    else{
      query = "SELECT SUM(h.weight) AS weight, SUM(h.amount) AS amount FROM users AS u JOIN veg AS v ON u.garden_id = v.garden_id " +
        "JOIN harvest AS h ON v.veg_id = h.veg_id WHERE u.email = crypt($1, email)";
      values = [session.user.email];
    }

    let result = await conn.query(query, values);

    weight = result.rows[0].weight;
    count = result.rows[0].amount;

    console.log(result);
  }
  catch(e){
    console.log(e);
  }
  return (
    <>
      <StatusBar text="Vegetable Statistics"/>
      <main className="w-full flex flex-col items-center bg-gray-50 pt-10">
        <p>
          {veg_id ? <p>Total stats for vegetable number: {veg_id}</p> : <p>Total stats for user: {userName}</p>}
        </p>
        <p>
          Number of vegetables: {count}
        </p>
        <p>
          Total weight of vegetables: {weight}
        </p>
      </main>
    </>
  );
}
