const supabase = require('./config/supabaseClient');

async function checkJobs() {
  console.log("Checking jobs table...");
  const { data, error } = await supabase.from('jobs').select('*');
  if (error) {
    console.error("Supabase Error:", error);
    process.exit(1);
  }
  console.log(`Found ${data.length} jobs.`);
  data.forEach(job => {
    console.log(`- ${job.title}: [${job.required_skills?.join(', ')}]`);
  });
  process.exit(0);
}

checkJobs();
